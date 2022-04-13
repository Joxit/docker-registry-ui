import fs from 'fs';
import path from 'path';

const files = [
  'docker-registry-ui.css',
  'docker-registry-ui.js',
  'fonts/MaterialIcons-Regular.eot',
  'fonts/MaterialIcons-Regular.svg',
  'fonts/MaterialIcons-Regular.ttf',
  'fonts/MaterialIcons-Regular.woff',
  'fonts/MaterialIcons-Regular.woff2',
  'fonts/Roboto-Bold.ttf',
  'fonts/Roboto-Bold.woff',
  'fonts/Roboto-Bold.woff2',
  'fonts/Roboto-Light.ttf',
  'fonts/Roboto-Light.woff',
  'fonts/Roboto-Light.woff2',
  'fonts/RobotoMono-Regular.eot',
  'fonts/RobotoMono-Regular.ttf',
  'fonts/RobotoMono-Regular.woff',
  'fonts/RobotoMono-Regular.woff2',
  'fonts/Roboto-Regular.eot',
  'fonts/Roboto-Regular.ttf',
  'fonts/Roboto-Regular.woff',
  'fonts/Roboto-Regular.woff2',
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
