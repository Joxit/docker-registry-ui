import { taglistOrderVariants, taglistOrderParser, splitTagToArray } from '../src/scripts/taglist-order.js';
import { getTagComparator } from '../src/scripts/taglist-order.js';
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

  describe('taglistOrderParser', () => {
    it('should have default configuration when empty or undefined', () => {
      const expected = { numAsc: true, alphaAsc: true, numFirst: true };
      assert.deepEqual(taglistOrderParser(), expected);
      assert.deepEqual(taglistOrderParser(''), expected);
    });

    it('should parse correctly `num-asc;alpha-asc` and variants', () => {
      const expected = { numAsc: true, alphaAsc: true, numFirst: true };
      ['asc', 'num-asc;alpha-asc', 'num-asc'].forEach((e) =>
        assert.deepEqual(taglistOrderParser(e), expected, `wrong result for ${e}`)
      );
    });

    it('should parse correctly `alpha-desc;num-desc` and variants', () => {
      const expected = { numAsc: false, alphaAsc: false, numFirst: false };
      ['desc', 'alpha-desc;num-desc'].forEach((e) =>
        assert.deepEqual(taglistOrderParser(e), expected, `wrong result for ${e}`)
      );
    });

    it('should parse correctly `alpha-asc;num-desc` and variants', () => {
      const expected = { numAsc: false, alphaAsc: true, numFirst: false };
      assert.deepEqual(taglistOrderParser('alpha-asc;num-desc'), expected);
    });

    it('should parse correctly `num-desc;alpha-desc` and variants', () => {
      const expected = { numAsc: false, alphaAsc: false, numFirst: true };
      assert.deepEqual(taglistOrderParser('num-desc;alpha-desc'), expected);
    });
  });

  describe('splitTagToArray', () => {
    it('should reduce tags with numbers', () => {
      assert.deepEqual(splitTagToArray('0.2.4'), [0, '.', 2, '.', 4]);
      assert.deepEqual(splitTagToArray('1.2.3-SNAPSHOT'), [1, '.', 2, '.', 3, '-SNAPSHOT']);
      assert.deepEqual(splitTagToArray('alpine-3.2'), ['alpine-', 3, '.', 2]);
      assert.deepEqual(splitTagToArray('10.30.00'), [10, '.', 30, '.', 0]);
      assert.deepEqual(splitTagToArray('010.30.00'), [10, '.', 30, '.', 0]);
      assert.deepEqual(splitTagToArray('z010.30.00'), ['z', 10, '.', 30, '.', 0]);
    });

    it('should reduce tags without numbers', () => {
      assert.deepEqual(splitTagToArray('main'), ['main']);
      assert.deepEqual(splitTagToArray('master'), ['master']);
      assert.deepEqual(splitTagToArray('alpine-lts'), ['alpine-lts']);
    });
  });

  describe('getTagComparator', () => {
    it('should sort tags with `num-asc;alpha-asc`', () => {
      const comparator = getTagComparator(taglistOrderParser('num-asc;alpha-asc'));

      assert.deepEqual(['0.2.4', '1.2.5', '0.2.5'].sort(comparator), ['0.2.4', '0.2.5', '1.2.5']);
      assert.deepEqual(['latest', '0.2.4', 'main'].sort(comparator), ['0.2.4', 'latest', 'main']);
      assert.deepEqual(['latest', '1.0.0-SNAPSHOT', '1.0.0'].sort(comparator), ['1.0.0', '1.0.0-SNAPSHOT', 'latest']);
    });

    it('should sort tags with `num-desc;alpha-asc`', () => {
      const comparator = getTagComparator(taglistOrderParser('num-desc;alpha-asc'));

      assert.deepEqual(['0.2.4', '1.2.5', '0.2.5'].sort(comparator), ['1.2.5', '0.2.5', '0.2.4']);
      assert.deepEqual(['latest', '0.2.4', 'main'].sort(comparator), ['0.2.4', 'latest', 'main']);
      assert.deepEqual(['latest', '1.0.0-SNAPSHOT', '1.0.0'].sort(comparator), ['1.0.0', '1.0.0-SNAPSHOT', 'latest']);
    });

    it('should sort tags with `num-asc;alpha-desc`', () => {
      const comparator = getTagComparator(taglistOrderParser('num-asc;alpha-desc'));

      assert.deepEqual(['0.2.4', '1.2.5', '0.2.5'].sort(comparator), ['0.2.4', '0.2.5', '1.2.5']);
      assert.deepEqual(['latest', '0.2.4', 'main'].sort(comparator), ['0.2.4', 'main', 'latest']);
      assert.deepEqual(['latest', '1.0.0-SNAPSHOT', '1.0.0'].sort(comparator), ['1.0.0', '1.0.0-SNAPSHOT', 'latest']);
    });

    it('should sort tags with `num-desc;alpha-desc`', () => {
      const comparator = getTagComparator(taglistOrderParser('num-desc;alpha-desc'));

      assert.deepEqual(['0.2.4', '1.2.5', '0.2.5'].sort(comparator), ['1.2.5', '0.2.5', '0.2.4']);
      assert.deepEqual(['latest', '0.2.4', 'main'].sort(comparator), ['0.2.4', 'main', 'latest']);
      assert.deepEqual(['latest', '1.0.0-SNAPSHOT', '1.0.0'].sort(comparator), ['1.0.0', '1.0.0-SNAPSHOT', 'latest']);
    });

    it('should sort tags with `alpha-asc;num-asc`', () => {
      const comparator = getTagComparator(taglistOrderParser('alpha-asc;num-asc'));

      assert.deepEqual(['0.2.4', '1.2.5', '0.2.5'].sort(comparator), ['0.2.4', '0.2.5', '1.2.5']);
      assert.deepEqual(['latest', '0.2.4', 'main'].sort(comparator), ['latest', 'main', '0.2.4']);
      assert.deepEqual(['latest', '1.0.0-SNAPSHOT', '1.0.0'].sort(comparator), ['latest', '1.0.0', '1.0.0-SNAPSHOT']);
      assert.deepEqual(['latest', 'main', 'edge'].sort(comparator), ['edge', 'latest', 'main']);
    });

    it('should sort tags with `alpha-asc;num-desc`', () => {
      const comparator = getTagComparator(taglistOrderParser('alpha-asc;num-desc'));

      assert.deepEqual(['0.2.4', '1.2.5', '0.2.5'].sort(comparator), ['1.2.5', '0.2.5', '0.2.4']);
      assert.deepEqual(['latest', '0.2.4', 'main'].sort(comparator), ['latest', 'main', '0.2.4']);
      assert.deepEqual(['latest', '1.0.0-SNAPSHOT', '1.0.0'].sort(comparator), ['latest', '1.0.0', '1.0.0-SNAPSHOT']);
      assert.deepEqual(['latest', 'main', 'edge'].sort(comparator), ['edge', 'latest', 'main']);
    });

    it('should sort tags with `alpha-desc;num-asc`', () => {
      const comparator = getTagComparator(taglistOrderParser('alpha-desc;num-asc'));

      assert.deepEqual(['0.2.4', '1.2.5', '0.2.5'].sort(comparator), ['0.2.4', '0.2.5', '1.2.5']);
      assert.deepEqual(['latest', '0.2.4', 'main'].sort(comparator), ['main', 'latest', '0.2.4']);
      assert.deepEqual(['latest', '1.0.0-SNAPSHOT', '1.0.0'].sort(comparator), ['latest', '1.0.0', '1.0.0-SNAPSHOT']);
      assert.deepEqual(['latest', 'main', 'edge'].sort(comparator), ['main', 'latest', 'edge']);
    });

    it('should sort tags with `alpha-desc;num-desc`', () => {
      const comparator = getTagComparator(taglistOrderParser('alpha-desc;num-desc'));

      assert.deepEqual(['0.2.4', '1.2.5', '0.2.5'].sort(comparator), ['1.2.5', '0.2.5', '0.2.4']);
      assert.deepEqual(['latest', '0.2.4', 'main'].sort(comparator), ['main', 'latest', '0.2.4']);
      assert.deepEqual(['latest', '1.0.0-SNAPSHOT', '1.0.0'].sort(comparator), ['latest', '1.0.0', '1.0.0-SNAPSHOT']);
      assert.deepEqual(['latest', 'main', 'edge'].sort(comparator), ['main', 'latest', 'edge']);
    });
  });
});
