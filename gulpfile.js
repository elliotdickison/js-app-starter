var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

gulp.task('browserify', function(){
    gulp.src('src/client.js')
        .pipe(browserify({transform: 'babelify'}))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('default', ['browserify']);

gulp.task('watch', function(){
    gulp.watch('src/**/*.*', ['default']);
});
