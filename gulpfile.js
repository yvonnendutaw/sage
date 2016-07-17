// Include gulp
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plum = require('gulp-plumber'),
    sync = require('browser-sync'),
    auto = require('gulp-autoprefixer');

gulp.task('serve', ['sass'], function() {
  sync({
    proxy: 'localhost/comingsoon'
  });
  gulp.watch(['./*.html']).on('change', sync.reload);
  gulp.watch([
    './scss/_stats.scss',
    './scss/_nav.scss',
    './scss/_history.scss',
    './scss/_hero.scss',
    './scss/_featured.scss',
    './scss/_services.scss',
    './scss/_cta.scss',
    './scss/_journal.scss',
    './scss/_footer.scss',
    './scss/_social.scss',
    './scss/_quotes.scss',
    './scss/app.scss'
  ],['sass']);
});

gulp.task('sass', function() {
  return gulp.src('./scss/app.scss')
    .pipe(plum())
    .pipe(sass().on('error', sass.logError))
    .pipe(auto({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(gulp.dest('./css'))
    .pipe(sync.stream());
});

gulp.task('watch', ['serve'], function() {
  gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('default', ['serve'], function() {});
