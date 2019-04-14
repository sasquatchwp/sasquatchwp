import fs            from 'fs';
import gulp          from 'gulp';
import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import Parker        from 'parker/lib/Parker';
import prettyJSON    from 'prettyjson';

import { loadConfig } from './helpers';

const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS, DEVURL } = loadConfig();

export function audits (done) {
  fs.readFile(PATHS.cssfile, function(err, data) {
    var parker = new Parker(require('parker/metrics/All'));
    var results = parker.run(data.toString());
    console.log(prettyJSON.render(results));
    done();
  });
}