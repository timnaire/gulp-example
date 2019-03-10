const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
  Top Level functions
  -gulp.task - define task
  -gulp.src - points to files to use
  -gulp.dest - points to folder to output
  -gulp.watch - watch files and folders for changes
*/

// logs message
gulp.task('message',function(done){
  console.log('Gulp is running...');
  done();
});

// copy all HTML files
gulp.task('copyHTML',function(done){
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
  done();
});

//compile sass
gulp.task('sass',function(done){
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
  done();
});

// minify js
gulp.task("minify",function(done){
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
  done();
});

// optimize images
gulp.task('imageMin', function(done){
  gulp.src('src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/images'))
    done();
});

// Scripts

gulp.task('scripts',function(done){
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
  done();
});

gulp.task('default', gulp.series('message', 'copyHTML','sass','imageMin','scripts', function(done) {
  // do more stuff
  done();
}));

gulp.task('watch', function(done){
  gulp.watch('src/js/*.js', gulp.series('scripts'));
  gulp.watch('src/images/*', gulp.series('imageMin'));
  gulp.watch('src/sass/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('copyHTML'));
  done();
});
