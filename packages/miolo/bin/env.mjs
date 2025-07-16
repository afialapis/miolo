import { config } from '@dotenvx/dotenvx'
import path from 'node:path'
import { getAppNameFromPkg, findClosestPackageJson } from './util.mjs'

function _get_miolo_config_path(proyEnvPath) {
  const appName = getAppNameFromPkg(proyEnvPath)

  const mioloEnv = appName=='miolo-demo'
    ? '../miolo/bin/.env'
    : 'node_modules/miolo/bin/.env'

  return path.join(proyEnvPath, mioloEnv)
}


export function init_env_config() {
  const proyEnvPath = findClosestPackageJson(process.cwd())
  const debug = process.env.DOTENVX_DEBUG === 'true'

  // miolo defaults
  const libEnvPath = _get_miolo_config_path(proyEnvPath)
  config({ path: libEnvPath, debug })

  // proyect config
  
  if (proyEnvPath) {
    config({ path: path.join(proyEnvPath, '.env'), override: true, debug })
  }
}
