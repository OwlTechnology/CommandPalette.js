var gulp = require('gulp-param')(require('gulp'), process.argv);
var gulpif = require("gulp-if");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var clean = require("gulp-clean");

gulp.task("default", function(){

});

gulp.task("clean", function(){
    return gulp.src("dist/*", {read: false})
               .pipe(clean());
});

gulp.task("build", function(debug, prod){
    var buildSetting = debug ? 0 : prod ? 1 : 0;

    return gulp.src("src/*.js")
               .pipe(concat("CommandPalette.js"))
               .pipe(gulpif(buildSetting == 1, uglify()))
               .pipe(gulpif(buildSetting == 1, gulp.dest("dist/prod/")))
               .pipe(gulpif(buildSetting == 0, gulp.dest("dist/debug/")));
});

gulp.task("watch", function(debug, prod){
    gulp.watch("src/*.js", ["build"]);
});
