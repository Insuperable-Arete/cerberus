var gulp = require("gulp");
var jade = require("gulp-jade");
var sass = require("gulp-sass");
var jshint = require("gulp-jshint");
var a11y = require("gulp-a11y");
var jasmine = require("gulp-jasmine");
var watch = require("gulp-watch");
var nodemon = require("gulp-nodemon");
var Server = require('karma').Server;

gulp.task("lint", function(){
  return gulp.src([
    "./client/**/*.js",
    "!./client/lib/**"
    ])
  .pipe(jshint(".jshintrc"))
  .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("jade", function(){
  return gulp.src([
    "./client/html/index.jade",
    "./client/html/infoView.jade",
    "./client/html/sidebarView.jade",
    "./client/html/overview.jade"
  ])
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest(function(file){
    return file.base;
  }));
});

gulp.task("test", function(done){
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// evaluates accessibility features in html
// gulp.task('audit', function () {
//   // return gulp.src('./**/*.html')
//   return gulp.src("./client/html/index.html")
//   .pipe(a11y())
//   .pipe(a11y.reporter());
// });

gulp.task("sass", function(){
  return gulp.src("./client/styles/style.scss")
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest("./client/assets"));
  });

gulp.task("watch", function(){
  // gulp.watch(["./client/**/*/js", "./client/*.js", "./client/styles/*.scss", ".client/html/*.jade"], ["lint", "jade", "sass"])
  watch(["./client/html/*.jade", "./client/styles/*.scss"], function(){
    gulp.start("jade");
    gulp.start("sass");
  });
})

gulp.task("serve", function () {
  nodemon({
    script: "./backend/server/server.js",
    env: {
      "NODE_ENV": "development"
    }
  });
});

// gulp.task("default", ["sass", "jade", "lint", "audit", "serve"], function(){
gulp.task("default", ["sass", "jade", "lint", "serve"], function() {
  "gulp says hi";
});
// TODO checkout karma version and how they mess up travis
