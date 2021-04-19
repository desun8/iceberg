import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import visualizer from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';
import progress from 'rollup-plugin-progress';
import sizes from 'rollup-plugin-sizes';

const isProduction = process.env.NODE_ENV === 'production';

const cache = false;
let sourcemap = false;

let plugins = [
  alias({
    entries: {
      vue: path.resolve('./node_modules/vue/dist/vue.esm.js'),
    },
  }),
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
    'process.env.VUE_ENV': JSON.stringify('browser'),
  }),
  typescript(),
  nodeResolve(),
  commonJs(),
  json(),
  progress(),
];

if (isProduction) {
  sourcemap = true;

  plugins = [
    ...plugins,
    terser(),
    sizes(),
    visualizer(),
  ];
}

export default {
  input: [
    'src/main.js',
    'src/about.js',
    'src/team.ts',
    'src/team-inner.ts',
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    name: 'library',
    sourcemap,
  },
  plugins,
  cache,
};
