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
const del = require('del');
const replace = require('gulp-batch-replace'); // 内容替换(这个没问题，上个包出的问题，这个包没出类似的问题)
const runSequence = require('run-sequence'); // 同步

gulp.task('views', () => {
    gulp.src('./src/views/**/*.*')
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true, // 压缩HTML
            removeComments: true, // 清除HTML注释
            collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
            removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
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
