'use strict';

var path = require('path');
var gulp = require('gulp');
var del = require('del');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var MonorepoTasks = require('gulp-tasks-monorepo');

sass.compiler = require('node-sass');

var repo = MonorepoTasks({
    dir: path.join( __dirname, '/packages' )
});

repo.task( 'clean', function clean( pkg ) {
    gutil.log( 'Cleaning', pkg.name(), 'package' );
    return del([
        path.join( pkg.location(), '/dist/css' ),
        path.join( pkg.location(), '/docs/assets/css' )
    ]);
});

repo.task( 'styles', function styles( pkg ) {
    gutil.log( 'Building', pkg.name(), 'package' );

    return gulp
        .src( path.join( pkg.location(), '/lib/scss/**/*.scss' ) )
        .pipe( sass().on( 'error', sass.logError ) )
        .pipe( cleanCSS() )
        .pipe( rename({
            suffix: '.min'
        }) )
        .pipe( gulp.dest( path.join( pkg.location(), '/dist/css' ) ) )
        .pipe( gulp.dest( path.join( pkg.location(), '/docs/assets/css' ) ) );
});