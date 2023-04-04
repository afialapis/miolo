import merge from 'assign-deep'
import base_config from './defaults.mjs'


function init_config(config) {
  return merge(base_config, config)
}

export {
  init_config
}