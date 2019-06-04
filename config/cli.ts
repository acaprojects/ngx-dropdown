import { Dashboard } from './dashboard';
import { ng } from './cmd';

import * as packager from 'electron-packager';
import * as gulp from 'gulp';
import * as install from 'gulp-install';
import * as yargs from 'yargs';

import './default';
import './remote';

const argv = yargs.argv;

const ngargs: string[] = [];
let error = false;

if (argv.prod || (argv.demo === true && argv.prod !== 'false')) { ngargs.push('--prod'); }
if (argv.aot || (argv.demo === true && argv.aot !== 'false')) { ngargs.push('--aot'); }
if (argv.port) { ngargs.push(`--port=${argv.port}`); }

Dashboard.show(argv.prod ? 'prod' : 'dev');

gulp.task('ng:build', () => ng('build', ...ngargs));
gulp.task('ng:serve', () => ng('serve', ...ngargs));
gulp.task('check:error', (next) => { error ? next('Building Angular project failed') : next(); });

gulp.task('package', () => gulp.series('build', 'install', 'package-app'));

gulp.task('install', () => gulp.src('./dist/package.json').pipe(install({ production: true })));

gulp.task('package-app', () =>
    packager({
        dir: './dist',
        out: '_package',
        overwrite: true,
        icon: './dist/assets/icon/favicon',
    }, (error, appPaths) => {
        console.log('===========================================================');
        console.log('================ Electron Packager Results ================');
        console.log('===========================================================');
        if (error) {
            console.log(error);
        } else if (appPaths) {
            console.log(appPaths.join('\n'));
        }
    })
);

gulp.task('build', gulp.series('pre-build', 'ng:build', 'post-build', 'check:error'));

gulp.task('default', gulp.series('build'));

gulp.task('serve', gulp.series('pre-serve', 'ng:serve'));
