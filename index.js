require('babel-register')({
  presets: [
    'env',
  ],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        api: './src',
      },
    }],
  ],
})
require('babel-polyfill')

module.exports = require('./server')