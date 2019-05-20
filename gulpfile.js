'use strict';
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const del = require('del');
const filter = require('gulp-filter');
const gIf = require('gulp-if');
const gulp = require('gulp');
const parallel = gulp.parallel;
const series = gulp.series;
const htmlmin = require('gulp-htmlmin');
const license = require('gulp-license');
const riot = require('gulp-riot');
const uglify = require('uglify-es');
const minifier = require('gulp-uglify/composer')(uglify);
const useref = require('gulp-useref');
const injectVersion = require('gulp-inject-version');
const merge = require('stream-series');

const allTags = ['src/tags/*.tag', 'src/tags/dialogs/*.tag'];

const allScripts = [
  'src/scripts/http.js',
  'src/scripts/script.js',
  'src/scripts/utils.js'
];

const staticTags = ['src/tags/*.tag'];

const staticScripts = [
  'src/scripts/http.js',
  'src/scripts/static.js',
  'src/scripts/utils.js'
];

function html() {
  var htmlFilter = filter('**/*.html', {restore: true});
  return gulp.src(['src/index.html'])
    .pipe(useref())
    .pipe(gIf(['*.js', '!*.min.js'], minifier())) // FIXME
    .pipe(htmlFilter)
    .pipe(htmlmin({
      removeComments: false,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      minifyJS: uglify
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest('dist'));
};

function clean() {
  return del(['dist']);
};

function appStatic() {
  return merge(gulp.src(staticScripts), gulp.src(staticTags).pipe(riot()))
    .pipe(concat('docker-registry-ui-static.js'))
    .pipe(minifier())
    .pipe(license('agpl3', {
      tiny: false,
      project: 'docker-registry-ui',
      year: '2016-2019',
      organization: 'Jones Magloire @Joxit'
    }))
    .pipe(injectVersion())
    .pipe(gulp.dest('dist/scripts'));
};

function app() {
  return merge(gulp.src(allScripts), gulp.src(allTags).pipe(riot()))
    .pipe(concat('docker-registry-ui.js'))
    .pipe(minifier())
    .pipe(license('agpl3', {
      tiny: false,
      project: 'docker-registry-ui',
      year: '2016-2019',
      organization: 'Jones Magloire @Joxit'
    }))
    .pipe(injectVersion())
    .pipe(gulp.dest('dist/scripts'));
};

function vendor() {
  return gulp.src(['node_modules/riot/riot.min.js', 'node_modules/riot-route/dist/route.min.js', 'node_modules/riot-mui/build/js/riot-mui-min.js'])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/scripts'));
};

function styles() {
  return gulp.src(['src/*.css'])
    .pipe(concat('style.css'))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(license('agpl3', {
      tiny: false,
      project: 'docker-registry-ui',
      year: '2016-2019',
      organization: 'Jones Magloire @Joxit'
    }))
    .pipe(gulp.dest('dist/'));
};

function fonts() {
  return gulp.src('src/fonts/*')
    .pipe(filter('**/*.{otf,eot,svg,ttf,woff,woff2}'))
    .pipe(gulp.dest('dist/fonts'));
};

function svgs() {
  return gulp.src(['src/images/*.svg'])
    .pipe(htmlmin({
      removeComments: false,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      minifyJS: uglify
    }))
    .pipe(gulp.dest('dist/images/'));
};

exports.build = series(clean, html, parallel(fonts, styles, vendor, app, appStatic, svgs));