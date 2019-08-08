/**
 * Build scripts related to Javascripts
 */

import gulp          from 'gulp';
import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import named         from 'vinyl-named';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import { loadConfig } from './helpers';

const $ = plugins();

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS, DEVURL } = loadConfig();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

let webpackConfig = {
  rules: [
    {
      test: /.js$/,
      use: [
        {
          loader: 'babel-loader'
        }
      ]
    }
  ]
}
// Combine JavaScript into one file
// In production, the file is minified
export function javascript() {
  return gulp.src(PATHS.entries)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream({module: webpackConfig}, webpack2))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/js'));

}