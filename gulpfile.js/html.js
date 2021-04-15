const { src, dest, watch } = require('gulp');
const posthtml = require('gulp-posthtml');
const posthtmlInclude = require('posthtml-include');

const plugins = [
  posthtmlInclude({
    root: 'src/templates',
  }),
];

const options = {};

function html() {
  return src('src/*.html')
    .pipe(posthtml(plugins, options))
    .pipe(dest('dist'));
}

exports.html = html;

exports.htmlWatch = function htmlWatch() {
  watch(
    [
      'src/*.html',
      'src/templates/**/*.html'
    ],
    { ignoreInitial: false },
    html
  );
};
