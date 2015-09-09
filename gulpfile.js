var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsxhint = require('jshint-jsx').JSXHINT;
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

var JS_GLOB = ['common/**/*.js', 'client/**/*.js', 'server/**/*.js'];

gulp.task('lint', function(){
    gulp.src(JS_GLOB)
        .pipe(jshint({
            linter: jsxhint,
            esnext: true,
        }))
        .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function(){
    gulp.src('client/index.js')
        .pipe(browserify({
            transform: 'babelify',
        }))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('default', ['lint', 'browserify']);

gulp.task('watch', function(){
    gulp.watch(JS_GLOB, ['default']);
});
