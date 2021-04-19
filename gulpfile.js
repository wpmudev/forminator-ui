'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

sass.compiler = require('node-sass');

var paths = {
    styles: {
        source: 'src/scss/**/*.scss',
        story: 'src/stories/assets/',
        dest: 'dist/css/'
    }
};

function clean() {
    return del(['dist']);
}

function styles() {
    return gulp.src(paths.styles.source)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.story))
        .pipe(gulp.dest(paths.styles.dest));
}

exports.clean = clean;
exports.styles = styles;