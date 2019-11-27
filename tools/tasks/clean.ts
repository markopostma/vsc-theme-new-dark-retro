import { task } from 'gulp'
import * as shelljs from 'shelljs'

task('clean', async () => {
  return await Promise.all([
    shelljs.exec('node_modules/.bin/rimraf dist'),
    shelljs.exec('node_modules/.bin/rimraf themes/*.json'),
  ])
})
