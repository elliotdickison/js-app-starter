var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('browserify', function(){
    gulp.src('src/main.js')
        .pipe(browserify({transform: 'babelify'}))
        .pipe(gulp.dest('public/js'));
});

gulp.task('copy', function(){
    gulp.src('src/index.html')
        .pipe(gulp.dest('public'));
});

gulp.task('default', ['browserify', 'copy']);

gulp.task('watch', function(){
    gulp.watch('src/**/*.*', ['default']);
});
