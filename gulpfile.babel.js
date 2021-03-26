// Core
import gulp from 'gulp';
import browserSync from 'browser-sync';
import sourceMaps from 'gulp-sourcemaps';
import fs from 'fs-extra';
import plumber from 'gulp-plumber';

// HTML
import posthtml from 'gulp-posthtml';
import posthtmlInclude from 'posthtml-include';
// Css
import postCss from 'gulp-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import postcssImport from 'postcss-easy-import';
import postcssHoverMediaFeature from 'postcss-hover-media-feature';
// import tailwindcss from 'tailwindcss';
// Img
// import imgMin from "gulp-imagemin";
// import imgMinPngquant from "imagemin-pngquant";
// import svgSprite from "gulp-svg-sprite";

// JS
import { rollup } from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';
// import visualizer from 'rollup-plugin-visualizer';
// import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
// import rollupCss from 'rollup-plugin-css-only';
// import { terser } from 'rollup-plugin-terser';
// import uglify from "gulp-uglify";
// import webpack from "webpack";
// import webpackStream from "webpack-stream";

const PATH = {
  html: ['src/index.html', 'src/templates/**/*.html'],
  css: ['src/styles/core.css', 'src/styles/main.css', 'src/styles/about.css', 'src/styles/sitemap.css', 'src/styles/personal-data.css'],
  cssWatch: 'src/styles/**/**/*.css',
  jsWatch: ['./src/main.js', './src/about.js', 'src/scripts/**/*.js'],
  images: ['src/images/**/*.{png,jpeg,jpg}'],
};

function clearDist(done) {
  fs.emptyDir('dist')
    .finally(() => done());
}

// HTML
function html(done) {
  const plugins = [
    posthtmlInclude({ root: 'src/templates' }),
  ];
  const options = {};

  gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(posthtml(plugins, options))
    .pipe(gulp.dest('dist'));
  done();
}

// CSS
// function wrapPipe(taskFn) {
//   return function (done) {
//     const onSuccess = function () {
//       done();
//     };
//     const onError = function (err) {
//       done(err);
//     };
//     const outStream = taskFn(onSuccess, onError);
//     if (outStream && typeof outStream.on === 'function') {
//       outStream.on('end', onSuccess);
//     }
//   };
// }
function makeStyle(done) {
  const plugins = [
    postcssImport(),
    // tailwindcss(),
    postcssHoverMediaFeature(),
    postcssPresetEnv({ stage: 0 }),
  ];

  gulp
    .src(PATH.css)
    .pipe(plumber())
    .pipe(sourceMaps.init())
    .pipe(postCss(plugins))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('dist'));

  done();
}

// JS
export function js(done) {
  rollup({
    input: ['./src/main.js', './src/about.js'],
    plugins: [
      nodeResolve(), // подключение модулей node
      commonJs({
        // include: /node_modules/,
        // namedExports: { 'choices.js/src/scripts/constants.js': ['KEY_CODES'] },
        sourceMap: false,
      }), // подключение модулей commonjs
      // sizeSnapshot(), // напишет в консоль размер бандла
      // terser(), // минификатор совместимый с ES2015+, форк и наследник UglifyES
      // visualizer(), // анализатор бандла,
      // rollupCss({ output: 'bundle.css' }),
    ],
  })
    .then((bundle) => bundle.write({
      dir: './dist',
      format: 'esm',
      name: 'main',
      sourcemap: false,
    }))
    .finally(() => done());
}

// Image
function copyImage(done) {
  fs.copy('src/images', 'dist/images')
    .finally(() => done());
}

function imageMin(done) {
  done();
}

const imageTask = gulp.series(copyImage, imageMin);

function copyVideo(done) {
  fs.copy('src/videos', 'dist/videos')
    .finally(() => done());
}

// Core tasks
function watch(done) {
  gulp.watch(PATH.html, html);
  gulp.watch(PATH.cssWatch, makeStyle);
  gulp.watch(PATH.jsWatch, js);
  gulp.watch(PATH.images, imageTask);
  done();
}

function serve(done) {
  browserSync.init({
    server: 'dist',
    open: false,
  });
  browserSync.watch('dist/**/*.*', browserSync.reload);
  done();
}

const defaultTask = gulp.series(
  clearDist,
  html,
  makeStyle,
  js,
  imageTask,
  copyVideo,
  gulp.parallel(watch, serve),
);

export const build = gulp.series(
  clearDist,
  html,
  makeStyle,
  js,
  imageTask,
  copyVideo,
);

export default defaultTask;
