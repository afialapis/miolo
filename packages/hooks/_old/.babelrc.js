const path = require('path')

module.exports = {
  presets: [
    ["@babel/preset-env", {"targets": {"esmodules": true}}],
    "@babel/preset-react"
  ],
  plugins: [
    [require.resolve('babel-plugin-module-resolver'), {
      "root": [path.resolve('./')]
    }]
  ]
}
