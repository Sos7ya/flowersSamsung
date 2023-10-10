const { src, dest, watch, series, parallel } = require("gulp");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify")

function defaultTask() {
    return src([
        "./scens/*.js",
    ])
        .pipe(concat('bundle.js'))
        
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(dest("."))
}

function makeLibs(){
    return src([
        "./libs/*.js",
    ])
        .pipe(concat('libs.js'))
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(dest("."))
}

function observer(){
    watch("./scens/*.js",{usePolling: true}, defaultTask);
    watch("./libs/*.js", {usePolling: true}, makeLibs);
}

exports.default = series(makeLibs, defaultTask, observer);