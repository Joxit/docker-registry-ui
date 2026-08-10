import fs from 'fs';
import path from 'path';

const files = [
  'docker-registry-ui.css',
  'docker-registry-ui.js',
  'fonts/IBMPlexSans.ttf',
  'fonts/IBMPlexMono-Regular.ttf',
  'fonts/IBMPlexMono-Medium.ttf',
  'fonts/IBMPlexMono-SemiBold.ttf',
  'fonts/IBMPlexMono-Bold.ttf',
  'images/docker-logo.svg',
  'index.html',
];

export default function (output) {
  return {
    name: 'check-output',
    writeBundle: () => {
      const missingFile = files.find((file) => !fs.existsSync(path.join(output, file)));
      if (missingFile) {
        throw new Error(`File ${missingFile} is missing after build`);
      }
    },
  };
}
