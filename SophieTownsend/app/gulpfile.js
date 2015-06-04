'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    replace = require('gulp-replace'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch');

gulp.task( 'default',function() {
});

gulp.task('clean', function () {

    gulp.src('./build', { read: false })
        .pipe(clean());
})

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

gulp.task('fa', function () {

    gulp.src('./bower_components/font-awesome/fonts/*')
        .pipe(gulp.dest('./build/css/font-awesome/fonts'));

})

gulp.task('index', function () {
    gulp.src('../index.html')
        .pipe(replace('bower_components/normalize.css/normalize.css', 'css/normalize.css/normalize.css'))
        .pipe(replace('bower_components/font-awesome/css/font-awesome.css','css/font-awesome/css/font-awesome.css'))
        .pipe(replace('scss/skeleton.scss', 'css/skeleton.css'))
        .pipe(replace('app/images','images'))
        .pipe(gulp.dest('build'));
})

gulp.task('build', ['bower','image','sass','fa','index'], function () {
    gulp.src(['../web.config'])
        .pipe(gulp.dest('build'));

});