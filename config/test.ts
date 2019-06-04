
import * as gulp from 'gulp';

import { cypress } from './cmd';

gulp.task('cypress', () => cypress('open'));

gulp.task('test', gulp.parallel('serve', 'cypress'));
