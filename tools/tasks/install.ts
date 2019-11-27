import { task } from 'gulp'
import * as shelljs from 'shelljs'

task('install', (done) => {
  shelljs.exec('npm ci', (err) => {
    if (err) console.error(err)
    done()
  })
})
