const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const mode = require('gulp-mode')();
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

gulp.task('process-scss', processScss);
gulp.task('process-js', processJs);
gulp.task('process-imgs', processImgs);
gulp.task('build', gulp.series('process-scss', 'process-js', 'process-imgs'));
gulp.task('default', developmentTask);

function processScss() {
    return gulp.src('src/scss/default.scss')
        .pipe(mode.development(sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 1%']
        }))
        .pipe(rename('style.css'))
        .pipe(cssnano())
        .pipe(mode.development(sourcemaps.write()))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css'))
        .pipe(mode.development(browserSync.stream()));
}

function processJs() {

    return gulp.src('src/app.js')
        .pipe(webpack({
            mode: mode.development() ? 'development' : 'production',
            watch: mode.development() ? true : false,
            output: {
                filename: 'bundle.min.js'
            }
        }))
        .pipe(babel({ presets: ['@babel/env']}))
        .pipe(mode.development(sourcemaps.init()))
        .pipe(uglify().on('error', (uglify) => {
            console.error(uglify.message);
            this.emit('end');
        }))
        .pipe(mode.development(sourcemaps.write()))
        .pipe(gulp.dest('public/js'))
        .pipe(mode.development(browserSync.stream()));
}

function processImgs() {
    return gulp.src('public/imgs/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/imgs'));
}

function developmentTask() {
    browserSync.init({
        server: "./public"
    });

    gulp.watch(
        ['src/scss/**/*.scss'],
        { ignoreInitial: false },
        gulp.series('process-scss')
    );

    gulp.watch(
        ['src/app.js'],
        { ignoreInitial: false },
        gulp.series('process-js')
    );

    gulp.watch(
        ['public/**/*.html'],
        { ignoreInitial: false },
    ).on('change', browserSync.reload);
}
