'use strict';
var gulp = require('gulp'),
    sass =require( 'gulp-sass' );

gulp.task( 'default',function() {
});

gulp.task( 'sass',function () {

    gulp.src( './scss/*.scss')
      .pipe(sass().on('error',sass.logError))
      .pipe(gulp.dest('./build/css'));

});

gulp.task('bower',function () {

    gulp.src('./bower_components/**/*.css')
        .pipe(gulp.dest('./build/css'));

});

gulp.task('image', function () {

    gulp.src('./images/**/*')
        .pipe(gulp.dest('./build/images'));

});

gulp.task('build', ['bower','image','sass'], function () {
    gulp.src(['../index.html', '../web.config'])
        .pipe(gulp.dest('build'));

});