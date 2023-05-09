import { DockerRegistryUIError } from './error.js';
import { isDigit } from './utils.js';

const TAGLIST_ORDER_REGEX = /(alpha-(asc|desc);num-(asc|desc))|(num-(asc|desc);alpha-(asc|desc))/;

export const taglistOrderVariants = (taglistOrder) => {
  switch (taglistOrder) {
    case 'desc':
      return 'alpha-desc;num-desc';
    case 'asc':
      return 'num-asc;alpha-asc';
    case 'alpha-desc':
    case 'alpha-asc':
    case 'num-desc':
    case 'num-asc':
      return `${taglistOrder};${taglistOrder.startsWith('num') ? 'alpha' : 'num'}-asc`;
    default:
      if (!taglistOrder) {
        return 'num-asc;alpha-asc';
      } else if (TAGLIST_ORDER_REGEX.test(taglistOrder)) {
        return taglistOrder;
      }
      throw new DockerRegistryUIError(`The order \`${taglistOrder}\` is not recognized.`);
  }
};

export const taglistOrderParser = (taglistOrder) => {
  const orders = taglistOrderVariants(taglistOrder)
    .split(';')
    .filter((e) => e)
    .map((e) => e.split('-').filter((e) => e))
    .reduce((acc, e, idx) => {
      if (e.length > 1) {
        acc[e[0] + 'Asc'] = e[1] === 'asc';
      }
      if (idx === 0) {
        acc.numFirst = e[0] === 'num';
      }
      return acc;
    }, {});

  return orders;
};

export const tagReduce = (acc, e) => {
  if (acc.length > 0 && isDigit(acc[acc.length - 1].charAt(0)) == isDigit(e)) {
    acc[acc.length - 1] += e;
  } else {
    acc.push(e);
  }
  return acc;
};

export const splitTagToArray = (tag) =>
  tag
    .split('')
    .reduce(tagReduce, [])
    .map((e) => (isDigit(e.charAt(0)) ? parseInt(e) : e));
