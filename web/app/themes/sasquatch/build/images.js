import gulp          from 'gulp';
import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import { loadConfig } from './helpers';

const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS, DEVURL } = loadConfig();

// Copy images to the "dist" folder
// In production, the images are compressed
export function images() {
  return gulp.src( PATHS.images )
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest( PATHS.dist + '/images' ));
}