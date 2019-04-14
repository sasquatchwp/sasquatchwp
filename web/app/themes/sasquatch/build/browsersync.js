/**
 * Build scripts related to browsersync.
 */
import gulp          from 'gulp';
import plugins       from 'gulp-load-plugins';
import browser       from 'browser-sync';
import yargs         from 'yargs';

import { loadConfig, copy } from './helpers';
import { sass } from './sass';
import { javascript } from './javascript';
import { images } from './images';

const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS, DEVURL } = loadConfig();

// Start a server with BrowserSync to preview the site in
export function server(done) {
  browser.init({
    files: ['{lib,views}/**/*.php', '*.php'],
    proxy: DEVURL,
    snippetOptions: {
      whitelist: ['/wp-admin/admin-ajax.php'],
      blacklist: ['/wp-admin/**']
    }
  });
  done();
}

// Reload the browser with BrowserSync
export function reload(done) {
  browser.reload();
  done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
export function watch() {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('assets/scss/**/*.scss').on('all', sass);
  gulp.watch('assets/js/**/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch('assets/images/**/*').on('all', gulp.series(images, browser.reload));
  gulp.watch('views/**/*.twig').on('all', gulp.series(browser.reload));
} 