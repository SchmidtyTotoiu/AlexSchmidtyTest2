//Include gulp
var gulp = require('gulp');

//Include our plugins
var	sass = require('gulp-sass');
var	autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var	minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var	rename = require("gulp-rename");

// Compile Our Sass
gulp.task('styles', function() {
    return gulp.src('src/scss/*.scss')
	    .pipe(sass({ style: 'expanded', errLogToConsole: true }))
	    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	    .pipe(gulp.dest('css'))
	    .pipe(rename({suffix: '.min'}))
	    .pipe(minifycss())
	    .pipe(gulp.dest('css'))
});

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('images'))
});



gulp.task('jekyll', function (gulpCallBack){
     var spawn = require('child_process').spawn;
     var jekyll = spawn('jekyll', ['build', '--watch'], {stdio: 'inherit'});
 
     jekyll.on('exit', function(code) {
         gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
     });
 });

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['styles']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/scripts/*.js', ['scripts']);
    gulp.watch('_site', ['jekyll']);



    // Watch tasks go inside inside server.listen()

});

// Default Task
gulp.task('default', ['styles', 'watch', 'images', 'scripts', 'jekyll', 'server']);


