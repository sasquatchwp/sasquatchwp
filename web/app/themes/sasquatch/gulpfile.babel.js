'use strict';

import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import browser       from 'browser-sync';
import gulp          from 'gulp';
import rimraf        from 'rimraf';
import yaml          from 'js-yaml';
import fs            from 'fs';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';
import lazypipe      from 'lazypipe';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS, DEVURL } = loadConfig();

//path to manifest
var revManifest = PATHS.dist + 'assets.json';

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
 gulp.series(clean, gulp.parallel(images, sass, javascript, copy), revision_css, revision_js ));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watch));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

function revision_css() {
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

function revision_js() {
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

// Copy files out of the assets folder
// This task skips over the "images", "js", and "scss" folders, which are parsed separately
function copy() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/'));
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src('assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    // Comment in the pipe below to run UnCSS in production
    //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' }) ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/css'))
    .pipe(browser.reload({ stream: true }));
}

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
function javascript() {
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

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src('assets/images/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + '/images'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    files: ['{lib,templates}/**/*.php', '*.php'],
    proxy: DEVURL,
    snippetOptions: {
      whitelist: ['/wp-admin/admin-ajax.php'],
      blacklist: ['/wp-admin/**']
    }
  });
  done();
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('assets/scss/**/*.scss').on('all', sass);
  gulp.watch('assets/js/**/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch('assets/images/**/*').on('all', gulp.series(images, browser.reload));
  gulp.watch('**/*.php').on('all', gulp.series(browser.reload));
  gulp.watch('**/*.twig').on('all', gulp.series(browser.reload));

}
