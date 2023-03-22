const path = require('path')
const aliases = require('./aliases')

module.exports = {
  presets: [
    ["@babel/preset-env", {"targets": {"esmodules": true}}],
    "@babel/preset-react"
  ],
  plugins: [
    [require.resolve('babel-plugin-module-resolver'), {
      "root": [path.resolve('./')],
      "alias": aliases
    }]
  ]
}
