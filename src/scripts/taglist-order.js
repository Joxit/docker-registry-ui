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
        return 'alpha-asc;num-desc';
      } else if (TAGLIST_ORDER_REGEX.test(taglistOrder)) {
        return taglistOrder;
      }
      throw new DockerRegistryUIError(`The taglist order \`${taglistOrder}\` is not recognized.`);
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

const applyOrder = (order, e1, e2) => {
  if (e1 === e2) {
    return 0;
  }
  const numFirst = order.numFirst ? 1 : -1;
  if (typeof e1 === 'number') {
    const factor = order.numAsc ? 1 : -1;
    return typeof e2 === 'number' ? (e1 - e2) * factor : -1 * numFirst;
  } else if (typeof e2 === 'number') {
    return 1 * numFirst;
  } else {
    const factor = order.alphaAsc ? 1 : -1;
    return e1.localeCompare(e2) * factor;
  }
};

export const getTagComparator = (order) => {
  return (e1, e2) => {
    const tag1 = splitTagToArray(e1.tag || e1);
    const tag2 = splitTagToArray(e2.tag || e2);

    for (var i = 0; i < tag1.length && i < tag2.length; i++) {
      const compare = applyOrder(order, tag1[i], tag2[i]);
      if (compare != 0) {
        return compare;
      }
    }
    return (e1.tag || e1).length - (e2.tag || e2).length;
  };
};
