'use strict';
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var del = require('del');
var filter = require('gulp-filter');
var fs = require('fs');
var gIf = require('gulp-if');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var license = require('gulp-license');
var riot = require('gulp-riot');
var minifier = require('gulp-uglify/minifier');
var uglify = require('uglify-js-harmony');
var useref = require('gulp-useref');

gulp.task('html', function() {
  var htmlFilter = filter('**/*.html', {restore: true});
  return gulp.src(['src/index.html'])
    .pipe(useref())
    .pipe(gIf(['*.js', '!*.min.js'], minifier({}, uglify))) // FIXME
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
});

gulp.task('clean', function(done) {
  return del(['dist']);
});

gulp.task('riot-tag', ['html'], function() {
  return gulp.src('src/tags/*.tag')
    .pipe(concat('tags.js'))
    .pipe(riot())
    .pipe(minifier({}, uglify))
    .pipe(license('agpl3', {
      tiny: false,
      project: 'docker-registry-ui',
      year: '2016',
      organization: 'Jones Magloire @Joxit'
    }))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('riot-static-tag', ['html'], function() {
  return gulp.src(['src/tags/catalog.tag', 'src/tags/app.tag', 'src/tags/taglist.tag', 'src/tags/remove-image.tag'])
    .pipe(concat('tags-static.js'))
    .pipe(riot())
    .pipe(minifier({}, uglify))
    .pipe(license('agpl3', {
      tiny: false,
      project: 'docker-registry-ui',
      year: '2016',
      organization: 'Jones Magloire @Joxit'
    }))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts-static', ['html'], function() {
  return gulp.src(['src/scripts/http.js', 'src/scripts/static.js'])
    .pipe(concat('script-static.js'))
    .pipe(minifier({}, uglify))
    .pipe(license('agpl3', {
      tiny: false,
      project: 'docker-registry-ui',
      year: '2016',
      organization: 'Jones Magloire @Joxit'
    }))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts', ['html'], function() {
  return gulp.src(['src/scripts/http.js', 'src/scripts/script.js'])
    .pipe(concat('script.js'))
    .pipe(minifier({}, uglify))
    .pipe(license('agpl3', {
      tiny: false,
      project: 'docker-registry-ui',
      year: '2016',
      organization: 'Jones Magloire @Joxit'
    }))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('vendor', ['html'], function() {
  return gulp.src(['node_modules/riot/riot.min.js', 'node_modules/riotgear-router/dist/rg-router.min.js', 'node_modules/riot-mui/build/js/riot-mui-min.js'])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', ['html'], function() {
  return gulp.src(['src/*.css'])
    .pipe(concat('style.css'))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(license('agpl3', {
      tiny: false,
      project: 'docker-registry-ui',
      year: '2016',
      organization: 'Jones Magloire @Joxit'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/*')
    .pipe(filter('**/*.{otf,eot,svg,ttf,woff,woff2}'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('sources', ['riot-tag', 'riot-static-tag', 'scripts', 'vendor', 'scripts-static', 'styles'], function() {
  gulp.start();
});

gulp.task('build', ['clean'], function() {
  gulp.start(['sources', 'fonts']);
});