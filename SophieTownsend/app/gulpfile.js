'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    replace = require('gulp-replace'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    bootlint = require('gulp-bootlint');

gulp.task( 'default',['watch'],function() {
});

gulp.task('clean', function () {

    gulp.src('./dist', { read: false })
        .pipe(clean());
})

gulp.task('bootlint', function () {
    return gulp.src('../index.html')
        .pipe(bootlint());
});

gulp.task( 'sass',function () {

    gulp.src( './scss/*.scss')
      .pipe(sass().on('error',sass.logError))
      .pipe(gulp.dest('./dist/css'));

});

gulp.task('normalize',function () {

    gulp.src('./bower_components/normalize.css/*.css')
        .pipe(rename({dirname:''}))
        .pipe(gulp.dest('./dist/thirdparty/normalize'));

});

gulp.task('bootstrap', function () {

    gulp.src(['./bower_components/bootstrap/dist/**/{*.min.js,*.min.css,*.eot,*.svg,*.ttf,*.woff,*.woff2}'])
        .pipe(gulp.dest('./dist/thirdparty/bootstrap'));

});
gulp.task('jquery', function () {

    gulp.src('./bower_components/jquery/dist/*.min.js')
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('./dist/thirdparty/jquery/js'));

});

gulp.task('image', function () {

    gulp.src('./images/**/*')
        .pipe(gulp.dest('./dist/images'));

});

gulp.task('index', function () {
    gulp.src('../index.html')
        .pipe(replace('app/bower_components/normalize.css/normalize.css', 'thirdparty/normalize/normalize.css'))
        //.pipe(replace('app/bower_components/bootstrap/dist/css/bootstrap.css', 'thirdparty/bootstrap/css/bootstrap.min.css'))
        //.pipe(replace('app/bower_components/bootstrap/dist/css/bootstrap-theme.css', 'thirdparty/bootstrap/css/bootstrap-theme.min.css'))
        .pipe(replace('app/bower_components/bootstrap/dist/css/bootstrap.css', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css'))
        .pipe(replace('app/bower_components/bootstrap/dist/css/bootstrap-theme.css', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css'))
        //.pipe(replace('app/scss/skeleton.scss', 'css/skeleton.css'))
        .pipe(replace('app/scss/custom.scss', 'css/custom.css'))
        .pipe(replace('app/bower_components/bootstrap/dist/js/bootstrap.js', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js'))
        .pipe(replace('app/bower_components/jquery/dist/jquery.js', 'http://code.jquery.com/jquery-2.1.4.min.js'))
        //.pipe(replace('app/bower_components/bootstrap/dist/js/bootstrap.js', 'thirdparty/bootstrap/js/bootstrap.min.js'))
        //.pipe(replace('app/bower_components/jquery/dist/jquery.js', 'thirdparty/jquery/js/jquery.min.js'))
        .pipe(replace('app/images','images'))
        .pipe(gulp.dest('dist'));
})

gulp.task('build', ['normalize','image','sass','index'], function () {
    gulp.src(['../web.config'])
        .pipe(gulp.dest('dist'));

});

gulp.task('watch', function () {
    gulp.watch(['../index.html','scss/custom.scss'],['build']);
});