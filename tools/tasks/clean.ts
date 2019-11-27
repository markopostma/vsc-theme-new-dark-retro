import { task } from 'gulp'
import * as shelljs from 'shelljs'

task('clean', async () => {
  return await new Promise((resolve) => {
    shelljs.exec('npm cache clean --force', async (e) => {
      await Promise.all([
        shelljs.exec('node_modules/.bin/rimraf dist'),
      ]).then(resolve)
    })
  })
})
