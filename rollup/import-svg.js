import { extname } from 'path';

const injectNode = (svg) => `
export default function() {
  return (new DOMParser().parseFromString(${svg}, 'image/svg+xml'));
};
`;

/**
 * @param options
 * @param options.include
 * @param options.exclude
 * @param options.stringify - if true returns String, otherwise returns DOM Node
 */
export default function () {
  return {
    name: 'import-svg',
    transform: (code, id) => {
      if (extname(id) !== '.svg') return null;
      const content = JSON.stringify(code);

      return {
        code: injectNode(content),
        map: { mappings: '' },
      };
    },
  };
}
