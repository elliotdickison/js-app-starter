var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsxhint = require('jshint-jsx').JSXHINT;
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var shell = require('gulp-shell');

var JS_GLOB = ['common/**/*.js', 'client/**/*.js', 'server/**/*.js'];
var SASS_GLOB = 'client/styles/**/*.scss';
var TEST_GLOB = 'test/components/**/*.js';
var PUBLIC_DIR = 'public';

gulp.task('lint-js', function(){
    gulp.src(JS_GLOB)
        .pipe(jshint({
            linter: jsxhint,
            esnext: true,
        }))
        .pipe(jshint.reporter('default'));
});

gulp.task('test-js', function(){
    gulp.src(TEST_GLOB)
        .pipe(mocha({
            require: ['babelify/node_modules/babel-core/register'],
        }));
});

gulp.task('build-js', function(){
    gulp.src('client/index.js')
        .pipe(browserify({
            transform: 'babelify',
        }))
        .pipe(uglify())
        .pipe(gulp.dest(PUBLIC_DIR + '/js/'));
});

gulp.task('build-css', function () {
    gulp.src(SASS_GLOB)
        .pipe(sass({
            outputStyle: 'compressed',
        }))
        .pipe(gulp.dest(PUBLIC_DIR + '/css/'));
});

gulp.task('serve', shell.task([
    'node server',
]));

gulp.task('test', ['lint-js', 'test-js']);

gulp.task('build', ['build-js', 'build-css']);

gulp.task('default', ['test', 'build']);

gulp.task('watch', function(){
    gulp.watch(JS_GLOB, ['build']);
});
