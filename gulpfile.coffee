gulp = require "gulp"
$    = do require "gulp-load-plugins"

gulp.task "webpack", ->
  gulp.src "./src/"
  .pipe $.webpack require "./webpack.config.coffee"
  .pipe gulp.dest "./build/javascripts/"

gulp.task "default", ->
  $.watch "./src/**/*.js", ->
    gulp.start "webpack"
