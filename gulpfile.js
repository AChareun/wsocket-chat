const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

function cleanDist() {
    return src(['./dist'], { read: false, allowEmpty: true })
        .pipe(clean())
}

function copyHbs() {
    return src(['./src/**/*.hbs'])
        .pipe(dest('./dist'));
}

function compileTs() {
    const tsProject = ts.createProject('tsconfig.json');
    const tsResult = tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(dest('dist'));
}

const compileTask = series([cleanDist, compileTs, copyHbs]);

exports.default = compileTask;
