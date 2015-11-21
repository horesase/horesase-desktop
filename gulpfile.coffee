gulp = require "gulp"
webpack = require "webpack-stream"
$    = do require "gulp-load-plugins"

gulp.task "webpack", ->
  gulp.src "./src/"
  .pipe webpack require "./webpack.config.coffee"
  .pipe gulp.dest "./build/"

gulp.task "default", ->
  $.watch "./src/**/*.(js|scss)", ->
    gulp.start "webpack"
