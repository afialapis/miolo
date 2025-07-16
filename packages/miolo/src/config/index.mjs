import merge from 'deepmerge'
import make_config_defaults from './defaults.mjs'

function _get_auth_type(config) {
  if (config?.auth?.basic) {
    return 'basic'
  }

  if (config?.auth?.credentials) {
    return 'credentials'
  }

  if (config?.auth?.custom) {
    return 'custom'
  }

  return 'guest'
}


export function init_config(config) {
  // delay import of defaults, so env vars can be there
  const base_config = make_config_defaults()
  const all_config= merge(base_config, config)
  
  all_config.auth_type = _get_auth_type(config)
  all_config.use_catcher = all_config?.http?.catcher_url ? true : false

  return all_config
}
