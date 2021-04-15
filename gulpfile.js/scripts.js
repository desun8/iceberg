const { watch } = require('gulp');
const path = require('path');
const { rollup } = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonJs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const typescript = require('@rollup/plugin-typescript');
const alias = require('@rollup/plugin-alias');
const visualizer = require('rollup-plugin-visualizer');
const { terser } = require('rollup-plugin-terser');
const progress = require('rollup-plugin-progress');
const sizes = require('rollup-plugin-sizes');

const isProduction = process.env.NODE_ENV === 'production';

let plugins = [
  progress(),
  alias({
    entries: {
      vue: path.resolve('./node_modules/vue/dist/vue.esm.js'),
    },
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
    'process.env.VUE_ENV': JSON.stringify('browser'),
  }),
  typescript(),
  nodeResolve(),
  commonJs(),
];

let sourcemap = false;

if (isProduction) {
  sourcemap = true;

  plugins = [
    ...plugins,
    terser(),
    sizes(),
    visualizer()
  ];
}

let cache = false;

function scripts() {
  return rollup({
    input: [
      'src/main.js',
      'src/about.js',
      'src/team.ts',
      'src/team-inner.ts',
    ],
    plugins: plugins,
    cache: cache
  })
    .then(bundle => {
      return bundle.write({
        dir: 'dist',
        format: 'esm',
        name: 'library',
        sourcemap: sourcemap
      });
    });
}

exports.scripts = scripts;
exports.scriptsWatch = function scriptsWatch() {
  watch(
    [
      'src/*.{js,ts}',
      'src/scripts/**/*.{js,ts}'
    ],
    { ignoreInitial: false },
    scripts
  );
};
