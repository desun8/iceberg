const {
  src,
  dest
} = require('gulp');
const critical = require('critical').stream;

function criticalCss() {
  return src('dist/*.html')
    .pipe(critical({
      base: 'dist/',
      inline: true,
      css: 'dist/core.css',
      dimensions: [
        {
          height: 900,
          width: 1200,
        },
      ],
    }))
    .pipe(dest('dist'));
}

exports.criticalCss = criticalCss;
