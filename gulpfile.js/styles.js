const {
  src,
  dest,
  watch
} = require('gulp');
const sourceMaps = require('gulp-sourcemaps');

const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-easy-import');
const postcssHoverMediaFeature = require('postcss-hover-media-feature');
const postcssEasings = require('postcss-easings');
const apply = require('postcss-apply');
const cssnano = require('cssnano');

// const purgecss = require('@fullhuman/postcss-purgecss');

let plugins = [
  postcssImport(),
  postcssHoverMediaFeature(),
  apply(),
  postcssEasings(),
  postcssPresetEnv({
    stage: 0,
    features: {
      'focus-visible-pseudo-class': false
    }
  }),
];

if (process.env.NODE_ENV === 'production') {
  plugins = [
    ...plugins,
    // Может использовать только для core.css
    // purgecss({
    //   content: [
    //     './dist/*.html',
    //     './dist/*.js'
    //   ],
    // }),
    cssnano({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }],
    }),
  ];
}

function styles() {
  return src('src/styles/*.css')
    .pipe(sourceMaps.init())
    .pipe(postcss(plugins))
    .pipe(sourceMaps.write('.'))
    .pipe(dest('dist'));
}

exports.styles = styles;

exports.stylesWatch = function stylesWatch() {
  watch(
    'src/styles/**/**/*.css',
    { ignoreInitial: false },
    styles
  );
};
