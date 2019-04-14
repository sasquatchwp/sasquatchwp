import gulp          from 'gulp';
import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import autoprefixer  from 'autoprefixer';
import browser       from 'browser-sync';

import { loadConfig } from './helpers';

const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS, DEVURL } = loadConfig();

// Compile Sass into CSS
// In production, the CSS is compressed
export function sass() {
    return gulp.src('assets/scss/app.scss')
        .pipe($.sourcemaps.init())
        .pipe($.plumber())
        .pipe($.sass({
        includePaths: PATHS.sass,
        outputStyle: 'compressed'
        }).on('error', $.sass.logError))
        .on('error', () => {
            if (PRODUCTION){ throw new Error('Errors in SASS build.') }
        })
        .pipe($.postcss([autoprefixer()])) // uses ".browserslistrc"
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(PATHS.dist + '/css'))
        .pipe(browser.reload({ stream: true }));
}