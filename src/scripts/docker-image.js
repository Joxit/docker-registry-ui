import { Http } from './http';
import { isDigit, eventTransfer } from './utils';
import observable from '@riotjs/observable';

const tagReduce = (acc, e) => {
  if (acc.length > 0 && isDigit(acc[acc.length - 1].charAt(0)) == isDigit(e)) {
    acc[acc.length - 1] += e;
  } else {
    acc.push(e);
  }
  return acc;
};

export function compare(e1, e2) {
  const tag1 = e1.tag.match(/./g).reduce(tagReduce, []);
  const tag2 = e2.tag.match(/./g).reduce(tagReduce, []);

  for (var i = 0; i < tag1.length && i < tag2.length; i++) {
    const compare = tag1[i].localeCompare(tag2[i]);
    if (isDigit(tag1[i].charAt(0)) && isDigit(tag2[i].charAt(0))) {
      const diff = tag1[i] - tag2[i];
      if (diff != 0) {
        return diff;
      }
    } else if (compare != 0) {
      return compare;
    }
  }
  return e1.tag.length - e2.tag.length;
}

export class DockerImage {
  constructor(name, tag, list) {
    this.name = name;
    this.tag = tag;
    this.list = list;
    this.chars = 0;
    observable(this);
    this.on('get-size', function () {
      if (this.size !== undefined) {
        return this.trigger('size', this.size);
      }
      return this.fillInfo();
    });
    this.on('get-sha256', function () {
      if (this.size !== undefined) {
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
      if (this.digest !== undefined) {
        return this.trigger('content-digest', this.digest);
      }
      return this.fillInfo();
    });
  }
  fillInfo() {
    if (this._fillInfoWaiting) {
      return;
    }
    this._fillInfoWaiting = true;
    const oReq = new Http();
    const self = this;
    oReq.addEventListener('loadend', function () {
      if (this.status == 200 || this.status == 202) {
        const response = JSON.parse(this.responseText);
        if (response.mediaType === 'application/vnd.docker.distribution.manifest.list.v2+json') {
          self.trigger('list', response);
          const manifest = response.manifests[0];
          const image = new DockerImage(self.name, manifest.digest);
          eventTransfer(image, self);
          image.fillInfo();
          self.variants = [image];
          return;
        }
        self.size = response.layers.reduce(function (acc, e) {
          return acc + e.size;
        }, 0);
        self.sha256 = response.config.digest;
        self.layers = response.layers;
        self.trigger('size', self.size);
        self.trigger('sha256', self.sha256);
        oReq.getContentDigest(function (digest) {
          self.digest = digest;
          self.trigger('content-digest', digest);
          if (!digest) {
            // registryUI.showErrorCanNotReadContentDigest();
          }
        });
        self.getBlobs(response.config.digest);
      } else if (this.status == 404) {
        // registryUI.errorSnackbar('Manifest for ' + self.name + ':' + self.tag + ' not found');
      } else {
        // registryUI.snackbar(this.responseText);
      }
    });
    oReq.open('GET', registryUI.url() + '/v2/' + self.name + '/manifests/' + self.tag);
    oReq.setRequestHeader(
      'Accept',
      'application/vnd.docker.distribution.manifest.v2+json, application/vnd.oci.image.manifest.v1+json' +
        (self.list ? ', application/vnd.docker.distribution.manifest.list.v2+json' : '')
    );
    oReq.send();
  }
  getBlobs() {
    const oReq = new Http();
    const self = this;
    oReq.addEventListener('loadend', function () {
      if (this.status == 200 || this.status == 202) {
        const response = JSON.parse(this.responseText);
        self.creationDate = new Date(response.created);
        self.blobs = response;
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
      } else if (this.status == 404) {
        registryUI.errorSnackbar('Blobs for ' + self.name + ':' + self.tag + ' not found');
      } else {
        registryUI.snackbar(this.responseText);
      }
    });
    oReq.open('GET', registryUI.url() + '/v2/' + self.name + '/blobs/' + blob);
    oReq.setRequestHeader(
      'Accept',
      'application/vnd.docker.distribution.manifest.v2+json, application/vnd.oci.image.manifest.v1+json'
    );
    oReq.send();
  }
}
