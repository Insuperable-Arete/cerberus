var gulp = require("gulp");
var jade = require("gulp-jade");
var sass = require("gulp-sass");
var jshint = require("gulp-jshint");
var a11y = require("gulp-a11y");
var jasmine = require("gulp-jasmine");
var watch = require("gulp-watch");

gulp.task("lint", function(){
  return gulp.src("./client/**/*.js")
  .pipe(jshint(".jshintrc"))
  .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("jade", function(){
  // return gulp.src("./client/html/index.jade", "./client/html/map.jade", "./client/html/scripts.jade", "./client/html/dependencies.jade")
  return gulp.src("./client/html/index.jade")
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest(function(file){
    return file.base;
  }));
});

gulp.task("test", function(){
  return gulp.src("./spec/test.js")
    .pipe(jasmine({
      verbose: true
    }))
});

// evaluates accessibility features in html
gulp.task('audit', function () {
  // return gulp.src('./**/*.html')
  return gulp.src("./client/html/index.html")
  .pipe(a11y())
  .pipe(a11y.reporter());
});

gulp.task("sass", function(){
  return gulp.src("./client/styles/style.scss")
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest("./client/styles"));
  });

gulp.task("watch", function(){
  // gulp.watch(["./client/**/*/js", "./client/*.js", "./client/styles/*.scss", ".client/html/*.jade"], ["lint", "jade", "sass"])
  watch(["./client/html/*.jade", "./client/styles/*.scss"], function(){
    gulp.start("jade");
    gulp.start("sass");
  });
})

gulp.task("default", ["sass", "jade", "lint", "audit"], function(){
  "gulp says hi"
});
