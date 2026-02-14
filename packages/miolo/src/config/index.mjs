import merge from 'deepmerge'
import { init_env_config } from './env.mjs'
import make_config_defaults from './defaults.mjs'
import {isPlainObject} from 'is-plain-object'


export function init_config(makeConfig) {
  // Init environment vars
  init_env_config()

  // delay import of defaults, so env vars can be there
  const base_config = make_config_defaults()
  const custom_config = makeConfig()

  // isMergeableObject: objects like Joi schemas should be copied not merged
  const all_config= merge(base_config, custom_config, {isMergeableObject: isPlainObject})

  // Some addendum
  all_config.use_catcher = all_config?.http?.catcher_url ? true : false

  for (const auth_type of ['guest', 'basic', 'local', 'google']) {
    if (all_config.auth?.[auth_type] == undefined) {
      all_config.auth[auth_type] = {
        enabled: false
      }
    } else if (all_config.auth[auth_type]?.enabled == undefined) {
      all_config.auth[auth_type].enabled = true
    }
  }

  return all_config
}
