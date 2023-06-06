import { isNewestVersion } from '../src/scripts/utils.js';
import assert from 'assert';

describe('utils tests', () => {
  describe('isNewestVersion', () => {
    it(`should return true for the same version`, () => {
      const expected = ['2.0.0', '2.4.1', '2.5.0', null, undefined];
      expected.forEach((e) => assert.ok(isNewestVersion(e, e)));
    });

    it(`should return true with on common versions`, () => {
      assert.ok(isNewestVersion('2.5.1', '2.5.0'));
      assert.ok(isNewestVersion('2.5.0', '2.0.0'));
      assert.ok(isNewestVersion('2.15.0', '1.25.10'));
      assert.ok(isNewestVersion('10.10.10', '2.25.20'));
    });

    it(`should return false on common versions`, () => {
      assert.equal(isNewestVersion('1.0.0', '2.5.0'), false);
      assert.equal(isNewestVersion('10.10.10', '20.20.20'), false);
      assert.equal(isNewestVersion('2.4.10', '2.5.0'), false);
      assert.equal(isNewestVersion('2.5.0', '2.6.0'), false);
    });

    it(`should return true for -dev next versions`, () => {
      assert.ok(isNewestVersion('2.5.0-dev', '2.4.1'));
      assert.ok(isNewestVersion('2.6.0-dev', '2.5.0'));
      assert.ok(isNewestVersion('2.15.0-dev', '2.14.1'));
      assert.ok(isNewestVersion('2.15.0-dev', '1.16.0'));
    });

    it(`should return false for -dev with current minor version`, () => {
      assert.equal(isNewestVersion('2.5.0-dev', '2.5.0'), false);
      assert.equal(isNewestVersion('2.5.0-dev', '2.5.10'), false);
      assert.equal(isNewestVersion('2.15.0-dev', '2.15.0'), false);
      assert.equal(isNewestVersion('2.0.0-dev', '2.15.0'), false);
    });
    it(`should return true for -{commit sha} next versions`, () => {
      assert.ok(isNewestVersion('2.5.0-ffb6d14baf', '2.4.1'));
      assert.ok(isNewestVersion('2.6.0-ffb6d14baf', '2.5.0'));
      assert.ok(isNewestVersion('2.15.0-ffb6d14baf', '2.14.1'));
      assert.ok(isNewestVersion('2.15.0-ffb6d14baf', '1.16.0'));
    });

    it(`should return false for -{commit sha} with current minor version`, () => {
      assert.equal(isNewestVersion('2.5.0-ffb6d14baf', '2.5.0'), false);
      assert.equal(isNewestVersion('2.5.0-ffb6d14baf', '2.5.10'), false);
      assert.equal(isNewestVersion('2.15.0-ffb6d14baf', '2.15.0'), false);
      assert.equal(isNewestVersion('2.0.0-ffb6d14baf', '2.15.0'), false);
    });
  });
});
