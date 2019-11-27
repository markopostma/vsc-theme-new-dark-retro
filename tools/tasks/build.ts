import { task } from 'gulp'
import * as shelljs from 'shelljs'

task('build', (done) => {
  shelljs.exec('tsc', { silent: true }, (err) => {
    if (err) console.error(err)
    done()
  })
})
