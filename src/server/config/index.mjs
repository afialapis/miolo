import merge from 'deepmerge'
import base_config from './defaults.mjs'

function _get_auth_type(config) {
  if (config?.auth?.basic) {
    return 'basic'
  }

  if (config?.auth?.passport) {
    return 'passport'
  }

  if (config?.auth?.custom) {
    return 'custom'
  }

  return 'guest'
}


function init_config(config) {
  const all_config= merge(base_config, config)
  
  all_config.auth_type = _get_auth_type(config)
  all_config.use_catcher = all_config?.http?.catcher_url ? true : false

  return all_config
}

export {
  init_config
}