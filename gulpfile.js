//sodamatic gulp configuration file

//task loading
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const pump = require('pump');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const gulpCopy = require('gulp-copy');
const htmlmin = require('gulp-htmlmin');

//copy files
gulp.task('copyFiles', function () {
    gulp.src('src/themes/default/html/*.html')
        .pipe(gulp.dest('dev/'));
});

//minifing html files
gulp.task('minify', function() {
  return gulp.src('dev/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

//sass processing and minimalization css
gulp.task('sass', function() {
    return gulp.src('src/themes/default/sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('dev/css'))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
});

//file concatenation
gulp.task('concat', function() {
    return gulp.src('src/themes/default/scripts/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('dev/js'))
});

//javascript minimalization
gulp.task('compress', function(cb) {
    pump([
        gulp.src('dev/js/script.js'),
        uglify(),
        rename({suffix: '.min'}),
        gulp.dest('dist/js')
    ], cb);
});

//generating sourcemaps
gulp.task('sourcemaps', function() {
gulp.src(['dev/js/*.js', 'dev/css/index.css'], { base: 'src' })
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist'));
});

//images optimization
gulp.task('images', function() {
    return gulp.src('src/themes/default/images/*.*')
    .pipe(imagemin({optimizationLevel: 7, progressive: true}))
    .pipe(gulp.dest('dev/images'));
});

//copy images
gulp.task('copyImgs', function () {
    gulp.src('dev/images/*.*')
        .pipe(gulp.dest('dist/images'));
});

//changes watching task
gulp.task('watch', function() {
    gulp.watch('src/themes/default/html/*.html', ['copyFiles']);
    gulp.watch('dev/*.html', ['minify']);
    gulp.watch('src/themes/default/sass/*.sass', ['sass']);
    gulp.watch('src/themes/default/scripts/*.js', ['concat']);
    gulp.watch('dev/js/*.js', ['compress']);
    gulp.watch('dev/*.*', ['sourcemaps']);
    gulp.watch('src/themes/default/images/*.*', ['images']);
    gulp.watch('dev/images/*.*', ['copyImgs']);
});

//default gulp task
gulp.task('default', ['copyFiles', 'minify', 'sass', 'concat', 'compress', 'sourcemaps', 'images', 'copyImgs', 'watch']);
