/*eslint-env node */
//Udacity course on Web Tooling & Automation

var gulp = require('gulp');
var del = require('del');
var inject = require('gulp-inject');
var files = require('./gulp/gulp.config.js');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
// var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', ['clean','copy-html', /*'copy-images',*/ 'styles', 'lint', 'scripts'], function() {
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch(files.app_files.js, ['lint']);
  gulp.watch('/index.html', ['copy-html']);
  gulp.watch('files.dist_dir/index.html').on('change', browserSync.reload);

  browserSync.init({
    server: 'files.dist_dir'
  });
});

gulp.task('dist', [
  'copy-html',
  'index',
  // 'copy-images',
  'styles',
  'lint',
  'scripts-dist'
  // ,'copy-cssdist2'
]);

gulp.task('clean',function(callback){
  del(['files.dist_dir'],{force: true},callback)
});

gulp.task('index',function(){
  return gulp.src('./index.html')
  .pipe(inject(gulp.src(files.app_files.tpl_src),{ignorePath: 'dist'}))
  .pipe(gulp.dest(files.dist_dir));
});

gulp.task('scripts', function() {
  gulp.src('js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
  gulp.src('js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function() {
  gulp.src('./index.html')
    .pipe(gulp.dest(files.dist_dir));
});

// gulp.task('copy-cssdist2', function() {
//   gulp.src('./dist/css/main.css')
//     .pipe(gulp.dest('css'));
// });

gulp.task('styles', function() {
  gulp.src('sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('lint', function () {
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
