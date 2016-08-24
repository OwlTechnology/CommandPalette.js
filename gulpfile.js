var gulp = require('gulp-param')(require('gulp'), process.argv);
var gulpif = require("gulp-if");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var clean = require("gulp-clean");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");

gulp.task("default", function(){

});

gulp.task("clean", function(){
    return gulp.src("dist/*", {read: false})
               .pipe(clean());
});

gulp.task("build", ["build-css", "build-javascript"], function(debug, prod){
    return true;
});

gulp.task("build-css", function(debug, prod){
    var buildSetting = debug ? 0 : prod ? 1 : 0;

    if(buildSetting == 0){
        return gulp.src("sass/*.scss")
                   .pipe(sourcemaps.init())
                   .pipe(sass().on('error', sass.logError))
                   .pipe(sourcemaps.write())
                   .pipe(gulp.dest("dist/debug/css/"));
    }else{
        return gulp.src("sass/*.scss")
                   .pipe(sass({outputStyle: "compressed"}))
                   .pipe(gulp.dest("dist/prod/css/"));
    }
});

gulp.task("build-javascript", function(debug, prod){
    var buildSetting = debug ? 0 : prod ? 1 : 0;

    return gulp.src("src/*.js")
               .pipe(concat("CommandPalette.js"))
               .pipe(gulpif(buildSetting == 1, uglify()))
               .pipe(gulpif(buildSetting == 1, gulp.dest("dist/prod/")))
               .pipe(gulpif(buildSetting == 0, gulp.dest("dist/debug/")));
});

gulp.task("watch", function(debug, prod){
    gulp.watch("src/*.js", ["build-javascript"]);
    gulp.watcH("sass/*.scss", ["build-css"]);
});
