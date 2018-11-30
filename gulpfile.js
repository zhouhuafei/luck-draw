const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber'); // 报错就中断？使用这个处理一下即可。
const fs = require('fs');

const projectName = 'project';
const projectPath = `${__dirname}/${projectName}/`;
const projectAll = fs.readdirSync(projectPath);
const projectDir = projectAll.filter(function (v) {
    return fs.statSync(`${projectPath}/${v}`).isDirectory() === true;
});
const project = projectDir.map(function (v) {
    return `${projectName}/${v}`;
});

gulp.task('watch', function () {
    project.forEach(function (v) {
        gulp.watch([`${v}/src/scss/**/*.scss`], ['scss']);
    });
});

gulp.task('scss', function () {
    project.forEach(function (v) {
        gulp.src(`${v}/scss/**/*.scss`)
            .pipe(plumber())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false,
            }))
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(`${v}/dist/css`));
    });
});

gulp.task('default', ['scss', 'watch']);
