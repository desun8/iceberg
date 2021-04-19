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
  media,
  mediaWatch
} = require('./media');
const { criticalCss } = require('./criticalCss');

function startMsg(done) {
  log('Begin task...🚀🚀🚀');
  done();
}

function finishMsg(done) {
  log('Finish! 🎉🎉🎉');
  done();
}

function clear(done) {
  fs.emptyDir('dist', done);
}

function copyMock(done) {
  fs.copy('src/mockServiceWorker.js', 'dist/mockServiceWorker.js', done)
}

function serve(done) {
  browserSync.init({
    server: 'dist',
    open: false,
  });

  browserSync.watch('dist/')
    .on('change', browserSync.reload);

  done();
}

function watchTask(done) {
  htmlWatch();
  stylesWatch();
  mediaWatch();

  done();
}

if (process.env.NODE_ENV === 'production') {
  exports.start = series(clear, copyMock, parallel(watchTask, serve));
} else {
  exports.start = series(clear, copyMock, parallel(watchTask, serve));
}

exports.build = series(
  startMsg,
  clear,
  copyMock,
  html,
  styles,
  media,
  finishMsg,
);

exports['critical-css'] = criticalCss;

exports.default = function (done) {
  console.log('Привет 🐼');
  done();
};
