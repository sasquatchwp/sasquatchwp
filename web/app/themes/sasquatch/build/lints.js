/**
 * Build scripts related to SASS and JS linting.
 */

import gulp          from 'gulp';
import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import sassLint      from 'gulp-sass-lint';
import eslint        from 'gulp-eslint';
import { loadConfig } from './helpers';

const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS, DEVURL } = loadConfig();

export function sass_lint() {
  return gulp.src(PATHS.scss)
  .pipe(sassLint({
    config: PATHS.sasslint
  }))
  .pipe(sassLint.format())
  .pipe($.if( PRODUCTION, sassLint.failOnError() ));
}

export function es_lint() {
  return gulp.src(PATHS.js)
  .pipe(eslint({
    useEslintrc: true,
    configFile: PATHS.eslint
  }))
  .pipe(eslint.format())
  .pipe($.if( PRODUCTION, eslint.failAfterError() ));
}