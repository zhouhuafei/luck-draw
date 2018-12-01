const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber'); // 报错就中断？使用这个处理一下即可。
const browserify = require('gulp-browserify');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

gulp.task('views', () => {
    gulp.src('./src/views/**/*.*')
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest('./dist/views/'));
});

gulp.task('js', function () {
    gulp.src('./src/js/**/*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/env'],
        }))
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('scss', function () {
    gulp.src(`./src/scss/**/*.scss`)
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest(`./dist/css/`));
});

gulp.task('images', function () {
    gulp.src('./src/images/**/*.*')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images/'));
});

gulp.task('watch', function () {
    gulp.watch([`./src/views/**/*.*`], ['views']);
    gulp.watch([`./src/js/**/*.js`], ['js']);
    gulp.watch([`./src/scss/**/*.scss`], ['scss']);
    gulp.watch([`./src/images/**/*.*`], ['images']);
});

gulp.task('dev', ['views', 'js', 'scss', 'images', 'watch']);
