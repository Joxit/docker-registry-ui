import fs from 'fs';

const useref = /<!--\s*build:([a-z]+) ([-a-zA-Z./]+)\s*-->(.*?)<!--\s*endbuild\s*-->/ms;

const generateBalise = (type, output, body, opts = {}) => {
  switch (type) {
    case 'css':
      return `<link href="${output}" rel="stylesheet" type="text/css">`;
    case 'js':
      return `<script src="${output}"></script>`;
    case 'keep':
      return opts[output] ? body : '';
  }
};

export default function (src, opts) {
  let html = fs
    .readFileSync(src)
    .toString()
    .replace(/>\n+\s*/g, '>');
  while (useref.test(html)) {
    const [raw, type, output, body] = useref.exec(html);
    html = html.replace(raw, generateBalise(type, output, body, opts));
  }
  return html;
}
