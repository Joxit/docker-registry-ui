import { getBranching } from '../src/scripts/repositories.js';
import { DockerRegistryUIError } from '../src/scripts/error.js';
import assert from 'assert';

describe('repositories', () => {
  describe('getBranching', () => {
    it('should not branch for no levels', () => {
      const branching = getBranching(0, 0);
      assert.deepEqual(branching(['alpine', 'debian', 'nginx']), ['alpine', 'debian', 'nginx']);
      assert.deepEqual(branching(['alpine', 'joxit/docker-registry-ui', 'joxit/docker-registry-ui/amd64', 'nginx']), [
        'alpine',
        'joxit/docker-registry-ui',
        'joxit/docker-registry-ui/amd64',
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
      assert.deepEqual(
        branching(['alpine', 'joxit/docker-registry-ui', 'joxit/kokai', 'joxit/docker-registry-ui/amd64', 'nginx']),
        [
          'alpine',
          { images: ['joxit/docker-registry-ui', 'joxit/docker-registry-ui/amd64', 'joxit/kokai'], repo: 'joxit/' },
          'nginx',
        ]
      );
    });

    it('should branch for two level', () => {
      const branching = getBranching(2, 2);
      assert.deepEqual(branching(['alpine', 'debian', 'nginx']), ['alpine', 'debian', 'nginx']);
      assert.deepEqual(branching(['alpine', 'joxit/docker-registry-ui', 'nginx']), [
        'alpine',
        'joxit/docker-registry-ui',
        'nginx',
      ]);
      assert.deepEqual(
        branching([
          'alpine',
          'joxit/docker-registry-ui',
          'joxit/kokai',
          'joxit/docker-registry-ui/amd64',
          'joxit/docker-registry-ui/amd64/latest',
          'joxit/docker-registry-ui/armv7',
          'joxit/docker-registry-ui/armv7/latest',
          'nginx',
        ]),
        [
          'alpine',
          'joxit/docker-registry-ui',
          {
            images: [
              'joxit/docker-registry-ui/amd64',
              'joxit/docker-registry-ui/amd64/latest',
              'joxit/docker-registry-ui/armv7',
              'joxit/docker-registry-ui/armv7/latest',
            ],
            repo: 'joxit/docker-registry-ui/',
          },
          'joxit/kokai',
          'nginx',
        ]
      );
    });

    it('should branch from one to two level', () => {
      const branching = getBranching(1, 2);
      assert.deepEqual(branching(['alpine', 'debian', 'nginx']), ['alpine', 'debian', 'nginx']);
      assert.deepEqual(branching(['alpine', 'joxit/docker-registry-ui', 'nginx']), [
        'alpine',
        { images: ['joxit/docker-registry-ui'], repo: 'joxit/' },
        'nginx',
      ]);
      assert.deepEqual(
        branching([
          'alpine',
          'joxit/docker-registry-ui',
          'joxit/kokai',
          'joxit/docker-registry-ui/amd64',
          'joxit/docker-registry-ui/amd64/latest',
          'joxit/docker-registry-ui/armv7',
          'joxit/docker-registry-ui/armv7/latest',
          'nginx',
        ]),
        [
          'alpine',
          {
            images: [
              'joxit/docker-registry-ui',
              {
                images: [
                  'joxit/docker-registry-ui/amd64',
                  'joxit/docker-registry-ui/amd64/latest',
                  'joxit/docker-registry-ui/armv7',
                  'joxit/docker-registry-ui/armv7/latest',
                ],
                repo: 'joxit/docker-registry-ui/',
              },
              'joxit/kokai',
            ],
            repo: 'joxit/',
          },
          'nginx',
        ]
      );
    });
  });

  it('should branch from one to two level', () => {
    assert.throws(() => getBranching(2, 1), DockerRegistryUIError, `Did not throw on min > max`);
    assert.throws(() => getBranching(-2, 1), DockerRegistryUIError, `Did not throw on min < 0`);
    assert.throws(() => getBranching(2, -1), DockerRegistryUIError, `Did not throw on max < 0`);
    assert.throws(() => getBranching('foo', 'bar'), DockerRegistryUIError, `Did not throw on max < 0`);
  });
});
