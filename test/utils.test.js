import { taglistOrderVariants, talgistOrderParser } from '../src/scripts/utils.js';
import { DockerRegistryUIError } from '../src/scripts/error.js';
import assert from 'assert';

describe('utils tests', () => {
  describe('taglistOrderVariants', () => {
    it(`should return the input when it's well formed and num first`, () => {
      const expected = ['num-asc;alpha-asc', 'num-asc;alpha-desc', 'num-desc;alpha-asc', 'num-desc;alpha-asc'];
      expected.forEach((e) => assert.deepEqual(taglistOrderVariants(e), e));
    });

    it(`should return the input when it's well formed and alpha first`, () => {
      const expected = ['alpha-asc;num-asc', 'alpha-asc;num-desc', 'alpha-desc;num-asc', 'alpha-desc;num-asc'];
      expected.forEach((e) => assert.deepEqual(taglistOrderVariants(e), e));
    });

    it('should return correct variant of `num-asc;alpha-asc`', () => {
      const expected = 'num-asc;alpha-asc';
      [undefined, '', 'asc', 'num-asc'].forEach((e) => assert.deepEqual(taglistOrderVariants(e), expected));
    });

    it('should return correct variant of `alpha-desc;num-desc`', () => {
      const expected = 'alpha-desc;num-desc';
      ['desc'].forEach((e) => assert.deepEqual(taglistOrderVariants(e), expected));
    });

    it('should extend correctly orders', () => {
      ['alpha-desc', 'alpha-asc'].forEach((e) => assert.deepEqual(taglistOrderVariants(e), `${e};num-asc`));
      ['num-desc', 'num-asc'].forEach((e) => assert.deepEqual(taglistOrderVariants(e), `${e};alpha-asc`));
    });

    it('should throw error on incorrect values', () => {
      ['alpha-desc;alpha-asc', 'foobar'].forEach((e) =>
        assert.throws(() => taglistOrderVariants(e), DockerRegistryUIError, `Did not throw on ${e}`)
      );
    });
  });

  describe('talgistOrderParser', () => {
    it('should have default configuration when empty or undefined', () => {
      const expected = { numAsc: true, alphaAsc: true, numFirst: true };
      assert.deepEqual(talgistOrderParser(), expected);
      assert.deepEqual(talgistOrderParser(''), expected);
    });

    it('should parse correctly `num-asc;alpha-asc` and variants', () => {
      const expected = { numAsc: true, alphaAsc: true, numFirst: true };
      ['asc', 'num-asc;alpha-asc', 'num-asc'].forEach((e) =>
        assert.deepEqual(talgistOrderParser(e), expected, `wrong result for ${e}`)
      );
    });

    it('should parse correctly `alpha-desc;num-desc` and variants', () => {
      const expected = { numAsc: false, alphaAsc: false, numFirst: false };
      ['desc', 'alpha-desc;num-desc'].forEach((e) =>
        assert.deepEqual(talgistOrderParser(e), expected, `wrong result for ${e}`)
      );
    });

    it('should parse correctly `alpha-asc;num-desc` and variants', () => {
      const expected = { numAsc: false, alphaAsc: true, numFirst: false };
      assert.deepEqual(talgistOrderParser('alpha-asc;num-desc'), expected)
    });

    it('should parse correctly `num-desc;alpha-desc` and variants', () => {
      const expected = { numAsc: false, alphaAsc: false, numFirst: true };
      assert.deepEqual(talgistOrderParser('num-desc;alpha-desc'), expected)
    });
  });
});
