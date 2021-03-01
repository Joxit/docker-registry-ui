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

const useServe = process.env.ROLLUP_SERVE === 'true';
const output = useServe ? '.serve' : 'dist';

const plugins = [
  riot(),
  nodeResolve(),
  commonjs(),
  scss({ output: `./${output}/docker-registry-ui.css`, outputStyle: 'compressed' }),
  babel({ babelHelpers: 'bundled', presets: ['@babel/env'] }),
  html({ template: () => htmlUseref('./src/index.html') }),
];

if (useServe) {
  plugins.push(serve({ host: 'localhost', port: 8000, contentBase: [output, './'] }));
} else {
  plugins.push(terser());
}

export default [
  {
    input: { 'docker-registry-ui': 'src/index.js' },
    output: {
      dir: output,
      format: 'iife',
    },
    plugins: [emptyDirectories(output)].concat(plugins),
  },
];
