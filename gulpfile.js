var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    htmlmin = require('gulp-htmlmin'),
    minifyCss = require('gulp-minify-css'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del'),
    foreach = require('gulp-foreach'),
    ngannotate = require('gulp-ng-annotate');

gulp.task('jshint', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});
// Clean cache

gulp.task('clear', function () {

    return cache.clearAll();

});

// Clean
gulp.task('clean', function() {
    return del(['dist']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'clear','imagemin','copyfonts','copyHTMLTemplate', 'watch');
});

gulp.task('usemin',['jshint'], function () {
    //return gulp.src('./app/index.html')
    //  .pipe(foreach(function (stream, file) {
    //    return stream
    //        .pipe(usemin({
    //          css: [minifycss(), rev()],
    //          html: [htmlmin({collapseWhitespace: true})],
    //          js: [ngannotate(), uglify(), rev()]
    //        }))
    //        .pipe(gulp.dest('dist/'));
    //  }))
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifycss(), rev()],
      html: [htmlmin({collapseWhitespace: true})],
      js: [ngannotate(), uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});
gulp.task('copyHTMLTemplate', function () {
  return gulp.src('./app/views/*.html')
        .pipe(gulp.dest('./dist/views'))
});

// Images
gulp.task('imagemin', function() {
    return del(['dist/images']), gulp.src('app/images/*')
        .pipe(imagemin({
          optimizationLevel: 3,
          progressive: true,
          interlaced: true }))
        .pipe(gulp.dest('dist/images'))

});

gulp.task('copyfonts', ['clean'], function() {
    gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
    gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
});

// Watch
gulp.task('watch', ['browser-sync'], function() {
    // Watch .js files
    gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin','copyHTMLTemplate']);
    // Watch image files
    gulp.watch('app/images/**/*', ['imagemin']);

});

gulp.task('browser-sync', ['default'], function () {
    var files = [
        'app/**/*.html',
        'app/styles/**/*.css',
        'app/images/**/*.png',
        'app/scripts/**/*.js',
        'dist/**/*'
    ];

    browserSync.init(files, {
        server: {
            baseDir: "dist",
            index: "index.html"
        }
    });
    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', browserSync.reload);
});