var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('browserify', function(){
    gulp.src('src/client.js')
        .pipe(browserify({transform: 'babelify'}))
        .pipe(gulp.dest('public/js'));
});

gulp.task('default', ['browserify']);

gulp.task('watch', function(){
    gulp.watch('src/**/*.*', ['default']);
});
