import { series, task } from 'gulp'

import './tasks/build'
import './tasks/clean'
import './tasks/generate'
import './tasks/install'

task('default', series(
  'clean',
  'install',
  'build',
  'generate',
))
