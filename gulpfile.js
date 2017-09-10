var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var pug         = require('gulp-pug');
var sass        = require('gulp-sass');
var rename      = require("gulp-rename");
var inlineCss   = require('gulp-inline-css');
var sassGlob    = require('gulp-sass-glob');


/*-----Server-------*/
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });

  gulp.watch('build/**/*').on('change', browserSync.reload);
});

/*------ PUG--------*/
gulp.task('pug', function buildHTML() {
  return gulp.src('source/template/index.pug')
  .pipe(pug({
    pretty:true 
  }))
  .pipe(gulp.dest('build'))
});

/*------ SCSS-------*/
gulp.task('scss', function () {
  return gulp.src('source/scss/main.scss')
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build'));
});

/*------ Copy Img -------*/
gulp.task('copy', function(){
	return gulp.src('source/img/**/*.*')
		.pipe(gulp.dest('build'));
})

/*------ Inline -------*/
gulp.task('inline', function() {
    return gulp.src('build/index.html')
        .pipe(inlineCss({
            	applyStyleTags: true,
            	applyLinkTags: true,
            	removeStyleTags: false,
            	removeLinkTags: true
        }))
        .pipe(rename({
        	suffix: "-inline"
        }))
        .pipe(gulp.dest('build/'));
});

/*------ Watch -------*/
gulp.task('watch', function(){
	gulp.watch('source/template/**/*.pug', gulp.series('pug'));
	gulp.watch('source/scss/**/*.scss', gulp.series('scss'));
  /*gulp.watch('build/index.html', gulp.series('inline'));*/
});

/*------ Default -------*/
gulp.task('default', gulp.series(
	gulp.parallel('pug', 'scss', 'copy'),
	gulp.parallel('watch', 'server')

	)
);