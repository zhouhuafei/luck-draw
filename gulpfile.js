const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber'); // 报错就中断？使用这个处理一下即可。

gulp.task('watch', function () {
    gulp.watch([`./src/scss/**/*.scss`], ['scss']);
});

gulp.task('scss', function () {
    gulp.src(`./src/scss/**/*.scss`)
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`./src/css`));
});

gulp.task('default', ['scss', 'watch']);
