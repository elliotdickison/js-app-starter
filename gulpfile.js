var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsxhint = require('jshint-jsx').JSXHINT;
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

gulp.task('lint', function(){
    gulp.src('src/**/*.js')
        .pipe(jshint({
            linter: jsxhint,
            esnext: true,
        }))
        .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function(){
    gulp.src('src/client.js')
        .pipe(browserify({
            transform: 'babelify',
        }))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('default', ['browserify']);

gulp.task('watch', function(){
    gulp.watch('src/**/*.*', ['default']);
});
