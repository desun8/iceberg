const {
  series,
  parallel
} = require('gulp');
const fs = require('fs-extra');
const log = require('fancy-log');
const browserSync = require('browser-sync')
  .create();
const {
  html,
  htmlWatch
} = require('./html');
const {
  styles,
  stylesWatch
} = require('./styles');
const {
  scripts,
  scriptsWatch
} = require('./scripts');
const {
  media,
  mediaWatch
} = require('./media');
const { criticalCss } = require('./criticalCss');

function startMsg(cb) {
  log('Begin task...🚀🚀🚀');
  cb();
}

function finishMsg(cb) {
  log('Finish! 🎉🎉🎉');
  cb();
}

function clear(cb) {
  fs.emptyDir('dist', cb);
}

function serve(cb) {
  browserSync.init({
    server: 'dist',
    open: false,
  });

  browserSync.watch('dist/**/*.*', browserSync.reload());

  cb();
}

function watch(cb) {
  htmlWatch();
  stylesWatch();
  scriptsWatch();
  mediaWatch();

  cb();
}

if (process.env.NODE_ENV === 'production') {
  exports.start = series(clear, parallel(watch, serve));
} else {
  exports.start = series(clear, parallel(watch, serve));
}

exports.build = series(
  startMsg,
  clear,
  html,
  styles,
  scripts,
  media,
  finishMsg
);

exports['critical-css'] = criticalCss;
exports.serve = serve;

exports.default = function (cb) {
  console.log('Привет 🐼');
  cb();
};
