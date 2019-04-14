import plugins       from 'gulp-load-plugins';
import fs            from 'fs';
import yaml          from 'js-yaml';
import rimraf        from 'rimraf';
import gulp          from 'gulp';

const $ = plugins();

const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS, DEVURL } = loadConfig();

// Delete the "dist" folder
// This happens every time a build starts
export function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets folder
// This task skips over the "images", "js", and "scss" folders, which are parsed separately
export function copy() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/'));
}

export function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    var array_1 = yaml.load(ymlFile);

    if (fs.existsSync( 'user-config.yml' )) {
        let userYmlFile = fs.readFileSync('user-config.yml', 'utf8');
        var array_2 = yaml.load(userYmlFile);
        var unique = Object.assign({}, array_1, array_2);
    } else {
        var unique = array_1;
    }

    return unique;
}