const gulp = require('gulp')
const ftp = require('gulp-ftp')
const sftp = require('gulp-sftp')
const util = require('gulp-util')


gulp.task('ftpBeta', function () {
  const pkg = require('./package.json')
  return gulp.src(['./dist/**/*']).pipe(ftp({
    host: 'ipAddress',
    port: 8000,
    user: 'user',
    pass: 'password',
    remotePath: `${pkg.name}/beta/${pkg.version}`
  })).pipe(util.noop())
})

