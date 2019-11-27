const { join } = require('path')

require('ts-node').register({
  project: join(__dirname, './tsconfig.json')
})

require('./tools/gulpfile')
