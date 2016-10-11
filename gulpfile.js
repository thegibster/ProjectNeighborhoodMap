'use strict';
/*eslint-env node */
//Udacity course on Web Tooling & Automation and modified for my project
var gulp = require('gulp');
var del = require('del');
var inject = require('gulp-inject');
var source = require('vinyl-source-stream');
var request = require('request');
var merge = require('merge2');
var files = require('./gulp/gulp.config.js');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var buffer = require('gulp-buffer');

gulp.task('default', ['clean', 'copy-html', 'styles', 'js', 'scripts1'], function() {
    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('src/index.html', ['copy-html']);
    gulp.watch('files.dist_dir/index.html').on('change', browserSync.reload);

    browserSync.init({
        server: 'files.dist_dir'
    });
});

gulp.task('watchFiles', function() {
    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('src/index.html', ['copy-html']);
    gulp.watch('files.dist_dir/index.html').on('change', browserSync.reload);
});

gulp.task('serve', ['watchFiles']);

gulp.task('dist', [
    'copy-html',
    'index',
    'styles',
    'scripts-dist',
]);

gulp.task('clean', function(callback) {
    del(['files.dist_dir'], {
        force: true
    }, callback)
});

gulp.task('index', function() {
    return gulp.src('./index.html')
        .pipe(inject(gulp.src(files.app_files.tpl_src), {
            ignorePath: './dist'
        }))
        .pipe(gulp.dest(files.dist_dir));
});


gulp.task('scripts1', function() {
    gulp.src(['src/js/lib/*.js', 'src/js/concat.js', 'src/js/js.js','src/js/app.js', 'src/js/optionTrigger.js'])
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts-dist', function() {
    gulp.src('src/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('js', function() {

    var jquery = request(files.jquery)
        .pipe(source('jquery.js'));
    // var googlesMap = request(files.googlesMap)
    //     .pipe(source('goog.js'));
    var bootstrap = request(files.bootstrap)
        .pipe(source('bootstrap.js'));
    var fontawesome = request(files.fontawesome)
        .pipe(source('fontawesome.js'));


    return merge(jquery, bootstrap, fontawesome)
        .pipe(buffer())
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('src/js'));
});

gulp.task('copy-html', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest(files.dist_dir));
});

// gulp.task('copy-cssdist2', function() {
//   gulp.src('./dist/css/main.css')
//     .pipe(gulp.dest('css'));
// });

// gulp.task('copy-images', function() {
//   gulp.src('img/**/*.jpg')
//     .pipe(gulp.dest('dist/img'));
// });

gulp.task('styles', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});
