import { supportListManifest, filterWrongManifests, platformToString } from '../src/scripts/docker-image.js';
import { dockerManifestList } from './fixtures/docker-manifest-list.js';
import { ociImageIndexLayer } from './fixtures/oci-image-index-layer.js';
import { ociImageIndexManifest } from './fixtures/oci-image-index-manifest.js';
import assert from 'assert';

describe('docker-image', () => {
  describe('supportListManifest', () => {
    /**
     * Manifest of an image created with:
     * docker buildx build --platform amd64,arm -t joxit/docker-registry-ui:buildx --push --provenance false .
     */
    it('should support mediaType `application/vnd.docker.distribution.manifest.list.v2+json`', () => {
      assert.ok(supportListManifest(dockerManifestList['application/vnd.docker.distribution.manifest.list.v2+json']));
    });
    /**
     * Index of an image created with:
     * docker buildx build --platform amd64,arm -t joxit/docker-registry-ui:buildx --push --provenance true .
     */
    it('should support mediaType `application/vnd.oci.image.index.v1+json`', () => {
      assert.ok(supportListManifest(ociImageIndexManifest['application/vnd.oci.image.index.v1+json']));
    });
    /**
     * Index of an image created with:
     * buildctl build --frontend=dockerfile.v0 --local context=. --local dockerfile=. --export-cache type=registry,ref=joxit/docker-registry-ui:buildkit
     */
    it('should not support mediaType `application/vnd.oci.image.index.v1+json` with layers (`application/vnd.oci.image.layer.v1.tar+gzip`)', () => {
      assert.ok(!supportListManifest(ociImageIndexLayer['application/vnd.oci.image.index.v1+json']));
    });
  });
  describe('supportListManifest', () => {
    it('should return all manifests for `application/vnd.docker.distribution.manifest.list.v2+json`', () => {
      assert.equal(
        filterWrongManifests(dockerManifestList['application/vnd.docker.distribution.manifest.list.v2+json']).length,
        2
      );
    });
    it('should return all manifests for `application/vnd.oci.image.index.v1+json`', () => {
      assert.equal(filterWrongManifests(ociImageIndexManifest['application/vnd.oci.image.index.v1+json']).length, 2);
    });
  });
  describe('platformToString', () => {
    it('should return unknown when the platform is not found', () => {
      assert.equal(platformToString(), 'unknown');
      assert.equal(platformToString({}), 'unknown');
    });
    it('should format the platform', () => {
      assert.equal(platformToString({ os: 'linux', architecture: 'amd64' }), 'amd64');
      assert.equal(platformToString({ os: 'linux', architecture: 'arm', variant: 'v7' }), 'armv7');
      assert.equal(platformToString({ architecture: 'arm', variant: 'v7' }), 'armv7');
    });
  });
});
