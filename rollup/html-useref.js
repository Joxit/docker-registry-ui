import fs from 'fs';

const useref = /<!--\s*build:([a-z]+) ([-a-zA-Z./]+)\s*-->.*?<!--\s*endbuild\s*-->/;

const generateBalise = (type, output) => {
  switch(type) {
    case 'css':
      return `<link href="${output}" rel="stylesheet" type="text/css">`;
    case 'js':
      return `<script src="${output}"></script>`
  }
}

export default function(src) {
  let html = fs.readFileSync(src).toString().replace(/>\n+\s*/g, '>');
  while (useref.test(html)) {
    const [ raw, type, output ] = useref.exec(html);
    html = html.replace(raw, generateBalise(type, output)); 
  }
  return html;
}