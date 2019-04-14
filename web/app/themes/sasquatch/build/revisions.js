/**
 * Build scripts related to adding version suffix.
 */

import plugins       from 'gulp-load-plugins';
import gulp          from 'gulp';
import yargs         from 'yargs';
import { loadConfig } from './helpers';

const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS, DEVURL } = loadConfig();

export function revision_css() {
	return gulp.src([ PATHS.dist + '/css/*.css' ], {base: PATHS.dist + '/css' })
  .pipe($.if(PRODUCTION, gulp.dest(PATHS.dist + '/css' )))
  .pipe($.if(PRODUCTION, $.rev() ))
  .pipe($.if(PRODUCTION, gulp.dest(PATHS.dist + '/css')))
  .pipe($.if(PRODUCTION, $.rev.manifest( PATHS.dist +'/manifest.json', {
    base: PATHS.dist,
    merge: true
  } )))
  .pipe($.if(PRODUCTION, gulp.dest(PATHS.dist)));
}

export function revision_js() {
	return gulp.src([ PATHS.dist + '/js/*.js' ], {base: PATHS.dist + '/js' })
  .pipe($.if(PRODUCTION, gulp.dest(PATHS.dist + '/js' )))
  .pipe($.if(PRODUCTION, $.rev() ))
  .pipe($.if(PRODUCTION, gulp.dest(PATHS.dist + '/js')))
  .pipe($.if(PRODUCTION, $.rev.manifest( PATHS.dist +'/manifest.json', {
    base: PATHS.dist,
    merge: true
  } )))
  .pipe($.if(PRODUCTION, gulp.dest(PATHS.dist)));
}