const merge = require('assign-deep')
const base_config = require('./defaults.js')


function init_config(config) {
  return merge(base_config, config)
}

export {
  init_config
}