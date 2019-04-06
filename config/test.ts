
import * as gulp from 'gulp';

import { cypress } from './ng';

gulp.task('test', ['cypress']);

gulp.task('cypress', () => cypress('open'));
