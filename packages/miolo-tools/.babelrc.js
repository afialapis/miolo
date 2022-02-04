const path = require('path')

module.exports = {
  presets: [
    ["@babel/preset-env", {"targets": {"esmodules": true}}]
  ],
  plugins: [
    [require.resolve('babel-plugin-module-resolver'), {
      "root": [path.resolve('./')]
    }]
  ]
}
