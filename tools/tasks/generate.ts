import { task } from 'gulp'
import { Generator } from '../../src'

task('generate', async () => {
  await Generator.compile()
})
