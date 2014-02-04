var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify')
    rename = require('gulp-rename');

var src     = 'jquery.heightmatch.js',
    dist    = 'jquery.heightmatch.min.js'
    srcDir  = './src/',
    distDir = './dist/';

gulp.task('lint', function() {
    gulp.src(srcDir + src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('uglify', function() {
    gulp.src(srcDir + src)
        .pipe(uglify({ outSourceMaps: true }))
        .pipe(rename(dist))
        .pipe(gulp.dest(distDir));
});

gulp.task('build', ['lint', 'uglify']);

gulp.task('watch', function() {
   gulp.watch(srcDir + src, ['build']);
});

gulp.task('default', ['build', 'watch']);