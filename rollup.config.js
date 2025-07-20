import riot from 'rollup-plugin-riot';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { emptyDirectories } from 'rollup-plugin-app-utils';
import { babel } from '@rollup/plugin-babel';
import scss from 'rollup-plugin-scss';
import serve from 'rollup-plugin-serve';
import html from '@rollup/plugin-html';
import htmlUseref from './rollup/html-useref.js';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import copyTransform from './rollup/copy-transform.js';
import license from './rollup/license.js';
import checkOutput from './rollup/check-output.js';
import importSVG from './rollup/import-svg.js';
import fs from 'fs';
const version = JSON.parse(fs.readFileSync('./package.json', 'utf-8')).version;

const useServe = process.env.ROLLUP_SERVE === 'true';
const output = useServe ? '.serve' : 'dist';

const getVersion = (version) => {
  const parts = version.split('.').map((e) => parseInt(e));
  if (useServe || process.env.DEVELOPMENT_BUILD) {
    parts[1]++;
    parts[2] = 0;
    return parts.join('.') + (useServe ? '-dev' : `-${process.env.DEVELOPMENT_BUILD.slice(0, 10)}`);
  }
  return version;
};

fs.writeFileSync('.version.json', JSON.stringify({ version: getVersion(version), latest: version }));

const plugins = [
  riot(),
  json(),
  importSVG(),
  nodeResolve(),
  commonjs(),
  scss({ fileName: `docker-registry-ui.css`, outputStyle: 'compressed' }),
  babel({ babelHelpers: 'bundled', presets: [['@babel/env', { useBuiltIns: 'usage', corejs: { version: '2' } }]] }),
  copy({
    targets: [
      { src: 'src/fonts', dest: `${output}` },
      { src: '.version.json', dest: `${output}`, rename: 'version.json' },
      { src: 'src/images/*', dest: `${output}/images`, transform: copyTransform },
    ],
  }),
];

if (useServe) {
  plugins.push(serve({ host: 'localhost', port: 8000, contentBase: [output, './'] }));
} else {
  plugins.push(terser({ format: { preamble: license } }));
}

export default [
  {
    input: { 'docker-registry-ui': 'src/index.js' },
    output: {
      dir: output,
      name: 'DockerRegistryUI',
      format: 'iife',
      sourcemap: useServe,
    },
    plugins: [emptyDirectories(output)].concat(
      plugins,
      html({ template: () => htmlUseref('./src/index.html', { developement: useServe, production: !useServe }) }),
      checkOutput(output)
    ),
  },
];
