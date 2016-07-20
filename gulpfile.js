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
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');

gulp.task('html', function() {
  var htmlFilter = filter('**/*.html');
  var assets;
  return gulp.src(['src/index.html'])
    .pipe(useref())
    .pipe(gIf(['*.js'], uglify({
      preserveComments: 'license'
    }))) // FIXME
    .pipe(htmlFilter)
    .pipe(htmlmin())
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('riot-tag', ['html'], function() {
  return gulp.src('src/tags/*.tag')
    .pipe(concat('tags.js'))
    .pipe(riot())
    .pipe(license('agpl3', {
      tiny: false,
      project: 'docker-registry-ui',
      year: '2016',
      organization: 'Jones Magloire @Joxit'
    }))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('riot-static-tag', ['html'], function() {
  return gulp.src(['src/tags/catalog.tag', 'src/tags/app.tag', 'src/tags/taglist.tag'])
    .pipe(concat('tags-static.js'))
    .pipe(riot())
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
    .pipe(uglify())
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
    .pipe(uglify())
    .pipe(license('agpl3', {
      tiny: false,
      project: 'docker-registry-ui',
      year: '2016',
      organization: 'Jones Magloire @Joxit'
    }))
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

gulp.task('sources', ['riot-tag', 'riot-static-tag', 'scripts', 'scripts-static', 'styles'], function() {
  gulp.start();
});

gulp.task('build', ['clean'], function() {
  gulp.start(['sources', 'fonts']);
});