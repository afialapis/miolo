import merge from 'deepmerge'
import { init_env_config } from './env.mjs'
import make_config_defaults from './defaults.mjs'
import isPlainObject from 'is-plain-object'

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


export function init_config(makeConfig) {
  // Init environment vars
  init_env_config()

  // delay import of defaults, so env vars can be there
  const base_config = make_config_defaults()
  const custom_config = makeConfig()

  // isMergeableObject: objects like Joi schemas should be copied not merged
  const all_config= merge(base_config, custom_config, {isMergeableObject: isPlainObject})

  // Some addendum
  all_config.auth_type = _get_auth_type(all_config)
  all_config.use_catcher = all_config?.http?.catcher_url ? true : false

  return all_config
}
