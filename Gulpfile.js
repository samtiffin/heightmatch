/* global require */
var gulp   = require('gulp'),
    header = require('gulp-header'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

var pkg = require('./package.json');

var banner = [
    '/*!',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
].join('\n');

var src     = 'jquery.heightmatch.js',
    dist    = 'jquery.heightmatch.min.js',
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
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename(dist))
        .pipe(gulp.dest(distDir));
});

gulp.task('dist', function() {
    gulp.src(srcDir + src)
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest(distDir));
});

gulp.task('build', ['lint', 'uglify', 'dist']);

gulp.task('watch', function() {
   gulp.watch(srcDir + src, ['build']);
});

gulp.task('default', ['build', 'watch']);