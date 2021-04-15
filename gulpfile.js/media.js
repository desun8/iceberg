const {
  series,
  watch
} = require('gulp');
const fs = require('fs-extra');

function copyImages(cb) {
  fs.copy('src/images', 'dist/images', cb);
}

function copyVideo(cb) {
  fs.copy('src/videos', 'dist/videos', cb);
}

exports.media = series(copyImages, copyVideo);
exports.mediaWatch = function mediaWatch() {
  watch(
    [
      'src/images/**/*.{png,jpeg,jpg,svg}',
      'src/videos/**/*.*'
    ],
    { ignoreInitial: false },
    series(copyImages, copyVideo)
  );
};
