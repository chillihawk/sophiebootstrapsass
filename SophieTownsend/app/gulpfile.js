'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    replace = require('gulp-replace'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    bootlint = require('gulp-bootlint'),
    scsslint = require('gulp-scss-lint'),
    autoprefixer = require('gulp-autoprefixer'),
    inject = require('gulp-inject');

gulp.task( 'default',['watch'],function() {
});

gulp.task('clean_dist', function () {

    return gulp.src('./dist', { read: false })
        .pipe(clean());
})

gulp.task('clean_temp', function () {

    return gulp.src('./temp', { read: false })
        .pipe(clean());
})

gulp.task('bootlint', function () {
    return gulp.src('../index.html')
        .pipe(bootlint());
});

gulp.task('scsslint', function () {
    return gulp.src('./scss/*.scss')
        .pipe(scsslint());
})

gulp.task('sass', function () {

    gulp.src('./scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/css'));

});

gulp.task('autoprefixer', function () {
    return gulp.src('./dist/css/custom.css')
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('image', function () {

    gulp.src('./images/**/*')
        .pipe(gulp.dest('./dist/images'));

});

gulp.task('head', function () {
    return gulp.src('./htmlpartials/_head.html')
        .pipe(replace('app/bower_components/normalize.css/normalize.css', 'thirdparty/normalize/normalize.css'))
        .pipe(replace('app/bower_components/bootstrap/dist/css/bootstrap.css', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css'))
        .pipe(replace('app/bower_components/bootstrap/dist/css/bootstrap-theme.css', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css'))
        .pipe(replace('app/scss/custom.scss', 'css/custom.css'))
        .pipe(replace('../images', 'images'))
        .pipe(gulp.dest('temp'));
})

gulp.task('nav', function () {
    return gulp.src('./htmlpartials/_nav.html')
        .pipe(replace('../../index.html', './index.html'))
        .pipe(replace('../../testimonials.html', './testimonials.html'))
        .pipe(replace('../../prices.html', './prices.html'))
        .pipe(replace('../../about.html', './about.html'))
        .pipe(replace('../../index.html#contact', './index.html#contact'))
        .pipe(replace('../images', 'images'))
        .pipe(gulp.dest('temp'));
})

gulp.task('script', function () {
    return gulp.src('./htmlpartials/_script.html')
        .pipe(replace('app/bower_components/bootstrap/dist/js/bootstrap.js', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js'))
        .pipe(replace('app/bower_components/jquery/dist/jquery.js', 'http://code.jquery.com/jquery-2.1.4.min.js'))
        .pipe(gulp.dest('temp'));
})

gulp.task('index', ['head','script','nav'], function () {
    return gulp.src('../index.html')
        .pipe(inject(gulp.src('./temp/_head.html'), {
            starttag: '<!-- inject:head:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src('./htmlpartials/_footer.html'), {
            starttag: '<!-- inject:footer:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src('./temp/_nav.html'), {
            starttag: '<!-- inject:nav:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src('./temp/_script.html'), {
            starttag: '<!-- inject:script:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(replace(new RegExp('(<li>)(<a href="./index.html">Home</a></li>)', 'i'), function (match, p1, p2, offset, string) {
            return '<li class="active">' + p2;
        }))
        .pipe(replace('app/images', 'images'))
        .pipe(gulp.dest('dist'));
})

gulp.task('prices', ['index'], function () {
    return gulp.src('../prices.html')
        .pipe(inject(gulp.src('./temp/_head.html'), {
            starttag: '<!-- inject:head:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src('./htmlpartials/_footer.html'), {
            starttag: '<!-- inject:footer:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src('./temp/_nav.html'), {
            starttag: '<!-- inject:nav:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src('./temp/_script.html'), {
            starttag: '<!-- inject:script:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(replace(new RegExp('(<li>)(<a href="./prices.html">Prices</a></li>)', 'i'), function (match, p1, p2, offset, string) {
            return '<li class="active">' + p2;
        }))
        .pipe(replace('app/images', 'images'))
        .pipe(gulp.dest('dist'));
})

gulp.task('testimonials', ['prices'], function () {
    return gulp.src('../testimonials.html')
        .pipe(inject(gulp.src('./temp/_head.html'), {
            starttag: '<!-- inject:head:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src('./htmlpartials/_footer.html'), {
            starttag: '<!-- inject:footer:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src('./temp/_nav.html'), {
            starttag: '<!-- inject:nav:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src('./temp/_script.html'), {
            starttag: '<!-- inject:script:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(replace(new RegExp('(<li>)(<a href="./testimonials.html">Testimonials</a></li>)', 'i'), function (match, p1, p2, offset, string) {
            return '<li class="active">' + p2;
        }))
        .pipe(replace('app/images', 'images'))
        .pipe(gulp.dest('dist'));
})

gulp.task('about', ['testimonials'], function () {
    return gulp.src('../about.html')
        .pipe(inject(gulp.src('./temp/_head.html'), {
            starttag: '<!-- inject:head:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src('./htmlpartials/_footer.html'), {
            starttag: '<!-- inject:footer:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src('./temp/_nav.html'), {
            starttag: '<!-- inject:nav:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(inject(gulp.src('./temp/_script.html'), {
            starttag: '<!-- inject:script:html -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(replace(new RegExp('(<li>)(<a href="./about.html">About</a></li>)', 'i'), function (match, p1, p2, offset, string) {
            return '<li class="active">' + p2;
        }))
        .pipe(replace('app/images', 'images'))
        .pipe(gulp.dest('dist'));
})

gulp.task('build', ['image','sass','about'], function (){
    gulp.src(['../web.config'])
        .pipe(gulp.dest('dist'));
});

gulp.task('dist', ['build'], function () {
    return gulp.task('autoprefixer');
});

gulp.task('prod', ['dist'], function () {
    return gulp.task('clean_temp');
});

gulp.task('watch', function () {
    gulp.watch(['../index.html','../prices.html','../testimonials.html','../about.html','scss/custom.scss'],['prod']);
});