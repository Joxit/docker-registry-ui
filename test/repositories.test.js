import { getBranching } from '../src/scripts/repositories.js';
import assert from 'assert';

describe('repositories', () => {
  describe('getBranching', () => {
    it('should not branch for no levels', () => {
      const branching = getBranching(0, 0);
      assert.deepEqual(branching(['alpine', 'debian', 'nginx']), ['alpine', 'debian', 'nginx']);
      assert.deepEqual(branching(['alpine', 'joxit/docker-registry-ui', 'nginx']), [
        'alpine',
        'joxit/docker-registry-ui',
        'nginx',
      ]);
    });

    it('should branch for one level', () => {
      const branching = getBranching(1, 1);
      assert.deepEqual(branching(['alpine', 'debian', 'nginx']), ['alpine', 'debian', 'nginx']);
      assert.deepEqual(branching(['alpine', 'joxit/docker-registry-ui', 'nginx']), [
        'alpine',
        { images: ['joxit/docker-registry-ui'], repo: 'joxit/' },
        'nginx',
      ]);
      assert.deepEqual(branching(['alpine', 'joxit/docker-registry-ui', 'joxit/kokai', 'nginx']), [
        'alpine',
        { images: ['joxit/docker-registry-ui', 'joxit/kokai'], repo: 'joxit/' },
        'nginx',
      ]);
    });
  });
});
