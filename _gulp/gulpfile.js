'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var cache = require('gulp-cache');
var notify = require('gulp-notify');
var slim = require("gulp-slim");
var sass = require("gulp-ruby-sass");
var csslint = require('gulp-csslint');
var autoPrefixer = require('gulp-autoprefixer');
var cssComb = require('gulp-csscomb');
var babel = require('gulp-babel');
var es2015 = require('babel-preset-es2015');
var rename = require('gulp-rename');
var imageMin = require('gulp-imagemin');
var zip = require('gulp-zip');

var srcPass = '../src/';
var buildPass ='../build/';

var fs = require('fs');
var packageData = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

var dt = new Date();
dt.setTime(dt.getTime() + 32400000); // 1000 * 60 * 60 * 9(hour)
var daytime = dt.getFullYear() + String(dt.getMonth()+1) + dt.getDate();

gulp.task("slim", function(){
  gulp.src(srcPass + '**/*.slim')
      .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
      .pipe(slim({
        pretty: true,
        require: "slim/include",
        options: 'include_dirs=["includes"]'
      }))
      .pipe(gulp.dest("../build"))
      .pipe(notify('html task finished'))
});

gulp.task("html", function() {
    gulp.src([srcPass + '**/*.html'])
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        .pipe( gulp.dest("../build") )
        .pipe(notify('html task finished'))
} );

gulp.task("sass", function () {
  sass([srcPass + 'assets/scss/**/*.scss'],{style: 'expanded'})
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(autoPrefixer())
    .pipe(cssComb())
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(gulp.dest(buildPass + 'assets/css/'))
    .pipe(notify('css(sass) task finished'))
});

gulp.task("css", function() {
    gulp.src([srcPass + 'assets/css/**/*.css'])
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        .pipe( gulp.dest(buildPass + 'assets/css') )
        .pipe(notify('css task finished'))
} );

gulp.task('js',function(){
  gulp.src([srcPass + 'assets/js/**/*.js'])
      .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
      .pipe(gulp.dest(buildPass + 'assets/js'))
      .pipe(notify('js task finished'))
});

gulp.task("babel_es6", function(){
  gulp.src([srcPass + 'assets/js/**/*.es6'])
       .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
       .pipe(babel({presets: [es2015]}))
       .pipe(rename({
          extname: '.js'
        }))
       .pipe(gulp.dest(buildPass + 'assets/js'))
       .pipe(notify('babel task finished'))
});

gulp.task('image',function(){
  gulp.src([srcPass + 'assets/img/**/*.*'])
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(cache(imageMin()))
    .pipe(gulp.dest(buildPass + 'assets/img'))
    .pipe(notify('image task finished'))
});

gulp.task('font',function(){
  gulp.src([srcPass + 'assets/font/**/*.*'])
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(gulp.dest(buildPass + 'assets/font'))
    .pipe(notify('font task finished'))
});

gulp.task('archive',['css', 'js','babel_es6', 'sass', 'slim', 'html', 'image', 'font'], function(){
  gulp.src(['../**/*.*', '!../_gulp/node_modules/**/*.*', '!' + buildPass + '**/*.*', '!../archive/**/*.*'])
    .pipe(zip(packageData.name + '_archive_' + daytime + '.zip'))
    .pipe(gulp.dest('../archive'))
    .pipe(notify('archive task finished'))
});

gulp.task('deploy',['css', 'js','babel_es6', 'sass', 'slim', 'html', 'image', 'font'], function(){
  gulp.src(['../**/*.*', '!../_gulp/node_modules/**/*.*', '!../archive/**/*.*'])
    .pipe(zip(packageData.name + '_deploy_' + daytime + '.zip'))
    .pipe(gulp.dest('../archive'))
    .pipe(notify('deploy task finished'))
});

gulp.task("server", function(){
  browserSync.init({
        server:(buildPass)
    });
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('default',['server', 'css', 'js','babel_es6', 'sass', 'slim', 'html', 'image', 'font'], function(){
  gulp.watch(srcPass + 'assets/js/**/*.js',['js','reload']);
  gulp.watch(srcPass + 'assets/js/**/*.es6',['babel_es6','reload']);
  gulp.watch(srcPass + 'assets/css/**/*.css',['css','reload']);
  gulp.watch(srcPass + 'assets/scss/**/*.scss',['sass','reload']);
  gulp.watch(srcPass + '**/*.slim',['slim','reload']);
  gulp.watch(srcPass + '**/*.html',['html','reload']);
  gulp.watch(srcPass + 'assets/img/**/*.*',['image','reload']);
  gulp.watch('../src/assets/font/**/*.*',['font','reload']);
});
