'use strict';

import gulp          from 'gulp';

import { clean, copy } from './build/helpers';
import { sass } from './build/sass';
import { watch, server } from  './build/browsersync';
import { revision_css, revision_js } from './build/revisions';
import { javascript } from './build/javascript';
import { images } from './build/images';
import { es_lint, sass_lint } from './build/lints';
import { audits } from './build/audits';

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
 gulp.series(clean, gulp.parallel(images, sass, javascript, copy), revision_css, revision_js ));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watch));

// SASS linting - configuration file .sass-lint-yml
gulp.task('sassLint', gulp.series(sass_lint) );

// JS linting - configuration file .eslintrc
gulp.task('esLint', gulp.series(es_lint) );

gulp.task('audit', gulp.series('build', audits ) );