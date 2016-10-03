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
var eslint = require('gulp-eslint');
// var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var buffer = require('gulp-buffer');

gulp.task('default', ['clean', 'copy-html', /*'copy-images',*/ 'styles', /*'lint',*/ 'js','scripts1'], function() {
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch(files.app_files.js, ['lint']);
    gulp.watch('/index.html', ['copy-html']);
    gulp.watch('files.dist_dir/index.html').on('change', browserSync.reload);

    browserSync.init({
        server: 'files.dist_dir'
    });
});

gulp.task('watchFiles', function() {
    gulp.watch('src/sass/**/*.scss', ['styles']);
    // gulp.watch(files.app_files.js, ['lint']);
    gulp.watch('./index.html', ['copy-html']);
    gulp.watch('files.dist_dir/index.html').on('change', browserSync.reload);
});

gulp.task('serve', ['watchFiles']);

gulp.task('dist', [
    'copy-html',
    'index',
    'styles',
    // 'lint',
    'scripts-dist',
    // 'copy-images'
    // ,'copy-cssdist2'
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

// gulp.task('scripts', function() {
//     gulp.src('js/**/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('dist/js'));
// });

gulp.task('scripts1', function() {
    gulp.src(['src/js/lib/*.js', 'src/js/concat.js', 'src/js/js.js', 'src/js/findAdd.js', 'src/js/app.js', 'src/js/optionTrigger.js'])
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

gulp.task('lint', function() {
    return gulp.src(files.app_files.js)
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failOnError());
});

// gulp.task('tests', function () {
//   gulp.src('tests/spec/extraSpec.js')
//     .pipe(jasmine({
//       integration: true,
//       vendor: 'js/**/*.js'
//     }));
// });
