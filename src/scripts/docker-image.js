/*
 * Copyright (C) 2016-2023 Jones Magloire @Joxit
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { Http } from './http.js';
import { eventTransfer, ERROR_CAN_NOT_READ_CONTENT_DIGEST } from './utils.js';
import observable from '@riotjs/observable';

export const supportListManifest = (response) => {
  if (response.mediaType === 'application/vnd.docker.distribution.manifest.list.v2+json') {
    return true;
  }
  if (response.mediaType === 'application/vnd.oci.image.index.v1+json' && Array.isArray(response.manifests)) {
    return !response.manifests.some(({ mediaType }) => mediaType !== 'application/vnd.oci.image.manifest.v1+json');
  }
  return false;
};

export const filterWrongManifests = (response) => {
  return response.manifests.filter(
    ({ annotations }) => !annotations || annotations['vnd.docker.reference.type'] !== 'attestation-manifest'
  );
};

export const platformToString = (platform) => {
  if (!platform || !platform.architecture) {
    return 'unknown';
  }
  return platform.architecture + (platform.variant ? platform.variant : '');
};

export class DockerImage {
  constructor(name, tag, { list, registryUrl, onNotify, onAuthentication, useControlCacheHeader, isRegistrySecured }) {
    this.name = name;
    this.tag = tag;
    this.chars = 0;
    this.opts = {
      list,
      registryUrl,
      onNotify,
      onAuthentication,
      useControlCacheHeader,
      isRegistrySecured,
    };
    this.ociImage = false;
    observable(this);
    this.on('get-size', function () {
      if (this.size !== undefined) {
        return this.trigger('size', this.size);
      }
      return this.fillInfo();
    });
    this.on('get-sha256', function () {
      if (this.sha256 !== undefined) {
        return this.trigger('sha256', this.sha256);
      }
      return this.fillInfo();
    });
    this.on('get-date', function () {
      if (this.creationDate !== undefined) {
        return this.trigger('creation-date', this.creationDate);
      }
      return this.fillInfo();
    });
    this.on('content-digest-chars', function (chars) {
      this.chars = chars;
    });
    this.on('get-content-digest-chars', function () {
      return this.trigger('content-digest-chars', this.chars);
    });
    this.on('get-content-digest', function () {
      if (this.contentDigest !== undefined) {
        return this.trigger('content-digest', this.contentDigest);
      }
      return this.fillInfo();
    });
  }
  fillInfo() {
    if (this._fillInfoWaiting) {
      return;
    }
    this._fillInfoWaiting = true;
    const oReq = new Http({
      onAuthentication: this.opts.onAuthentication,
      withCredentials: this.opts.isRegistrySecured,
    });
    const self = this;
    oReq.addEventListener('loadend', function () {
      if (this.status === 200 || this.status === 202) {
        const response = JSON.parse(this.responseText);
        if (supportListManifest(response) && self.opts.list) {
          const manifests = filterWrongManifests(response);
          self.trigger('list', manifests);
          self.manifests = manifests;
          const manifest = response.manifests[0];
          const image = new DockerImage(self.name, manifest.digest, { ...self.opts, list: false });
          eventTransfer(image, self);
          image.fillInfo();
          self.variants = [image];
          return;
        }
        self.ociImage = response.mediaType === 'application/vnd.oci.image.index.v1+json';
        self.layers = response.layers || response.manifests;
        self.annotations = response.annotations;
        self.size = self.layers.reduce(function (acc, e) {
          return acc + e.size;
        }, 0);
        self.sha256 = response.config && response.config.digest;
        self.trigger('size', self.size);
        self.trigger('sha256', self.sha256);
        oReq.getContentDigest(function (contentDigest) {
          self.contentDigest = contentDigest;
          self.trigger('content-digest', contentDigest);
          if (!contentDigest) {
            self.opts.onNotify(ERROR_CAN_NOT_READ_CONTENT_DIGEST);
          }
        });
        if (!self.ociImage) {
          self.getBlobs(self.sha256);
        } else {
          // Force updates
          self.trigger('creation-date');
          self.trigger('blobs');
          self.trigger('oci-image');
        }
      } else if (this.status === 404) {
        self.opts.onNotify(`Manifest for ${self.name}:${self.tag} not found`, true);
      } else {
        self.opts.onNotify(this.responseText);
      }
    });
    oReq.open('GET', `${this.opts.registryUrl}/v2/${self.name}/manifests/${self.tag}`);
    oReq.setRequestHeader(
      'Accept',
      'application/vnd.docker.distribution.manifest.v2+json, application/vnd.oci.image.manifest.v1+json, application/vnd.oci.image.index.v1+json' +
        (self.opts.list ? ', application/vnd.docker.distribution.manifest.list.v2+json' : '')
    );
    if (self.opts.useControlCacheHeader) {
      oReq.setRequestHeader('Cache-Control', 'no-store, no-cache');
    }
    oReq.send();
  }
  getBlobs(blob) {
    const oReq = new Http({
      onAuthentication: this.opts.onAuthentication,
      withCredentials: this.opts.isRegistrySecured,
    });
    const self = this;
    oReq.addEventListener('loadend', function () {
      if (this.status === 200 || this.status === 202) {
        const response = JSON.parse(this.responseText);
        self.creationDate = new Date(response.created || self.annotations?.['org.opencontainers.image.created']);
        self.blobs = response;
        self.blobs.history = self.blobs.history || [];
        self.blobs.history
          .filter(function (e) {
            return !e.empty_layer;
          })
          .forEach(function (e, i) {
            e.size = self.layers[i].size;
            e.id = self.layers[i].digest.replace('sha256:', '');
          });
        self.blobs.id = blob.replace('sha256:', '');
        self.trigger('creation-date', self.creationDate);
        self.trigger('blobs', self.blobs);
      } else if (this.status === 404) {
        self.opts.onNotify(`Blobs for ${self.name}:${self.tag} not found: blob '${self.blobs}'`, true);
      } else if (!this.responseText) {
        self.opts.onNotify(
          `Can"t get blobs for ${self.name}:${self.tag}: blob '${self.blobs}' (no message error)`,
          true
        );
      } else {
        self.opts.onNotify(this.responseText);
      }
    });
    oReq.open('GET', `${this.opts.registryUrl}/v2/${self.name}/blobs/${blob}`);
    oReq.setRequestHeader(
      'Accept',
      'application/vnd.docker.distribution.manifest.v2+json, application/vnd.oci.image.manifest.v1+json'
    );
    oReq.send();
  }
}
