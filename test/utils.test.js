import { taglistOrderVariants } from '../src/scripts/utils.js';
import assert from 'assert';

describe('utils tests', () => {
  describe('taglistOrderVariants', () => {
    it(`should return the input when it's well formed and num first`, () => {
      const expected = ['num-asc;alpha-asc', 'num-asc;alpha-desc', 'num-desc;alpha-asc', 'num-desc;alpha-asc'];
      expected.forEach(
        (e) => assert.deepEqual(taglistOrderVariants(e), e)
      );
    });

    it(`should return the input when it's well formed and alpha first`, () => {
      const expected = ['alpha-asc;num-asc', 'alpha-asc;num-desc', 'alpha-desc;num-asc', 'alpha-desc;num-asc'];
      expected.forEach(
        (e) => assert.deepEqual(taglistOrderVariants(e), e)
      );
    });

    it('should return correct variant of `num-asc;alpha-asc`', () => {
      const expected = 'num-asc;alpha-asc';
      ['asc', 'num-asc'].forEach(
        (e) => assert.deepEqual(taglistOrderVariants(e), expected)
      );
    });

    it('should return correct variant of `alpha-desc;num-desc`', () => {
      const expected = 'alpha-desc;num-desc';
      ['desc', 'alpha-desc'].forEach(
        (e) => assert.deepEqual(taglistOrderVariants(e), expected)
      );
    });
  });
});
