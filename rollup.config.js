import riot from 'rollup-plugin-riot';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { emptyDirectories } from 'rollup-plugin-app-utils';
import { babel } from '@rollup/plugin-babel';
import scss from 'rollup-plugin-scss';
import serve from 'rollup-plugin-serve';
import html from '@rollup/plugin-html';
import htmlUseref from './rollup/html-useref';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import copyTransform from './rollup/copy-transform';
import license from './rollup/license';
import checkOutput from './rollup/check-output';

const useServe = process.env.ROLLUP_SERVE === 'true';
const output = useServe ? '.serve' : 'dist';

const plugins = [
  riot(),
  json(),
  nodeResolve(),
  commonjs(),
  scss({ output: `./${output}/docker-registry-ui.css`, outputStyle: 'compressed' }),
  babel({ babelHelpers: 'bundled', presets: [['@babel/env', { useBuiltIns: 'usage', corejs: { version: '2' } }]] }),
  copy({
    targets: [
      { src: 'src/fonts', dest: `${output}` },
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
