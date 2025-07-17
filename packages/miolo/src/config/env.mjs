import { config } from '@dotenvx/dotenvx'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { intre_locale_init } from 'intre'
import { getInfoFromPkg, findClosestPackageJson } from './util.mjs'

function _get_miolo_config_path(proyEnvPath, appName) {
  const mioloEnv = appName=='miolo-demo'
    ? '../miolo/src/config/.env'
    : 'node_modules/miolo/src/config/.env'

  const mioloPath = path.join(proyEnvPath, mioloEnv)
  if (existsSync(mioloPath)) {
    return mioloPath
  }
  return null
}

function _get_miolo_config_path_on_build(proyEnvPath, srvDest) {
  
  const mioloPath = path.join(proyEnvPath, srvDest, '.env')
  if (existsSync(mioloPath)) {
    return mioloPath
  }
  return null
}


export function init_env_config(production= true) {
  process.env.NODE_ENV = production !== false ? 'production' : 'development'
  intre_locale_init(process.env.MIOLO_INTRE_LOCALE)  

  const proyEnvPath = findClosestPackageJson(process.cwd())
  const [appName, srvDest] = getInfoFromPkg(proyEnvPath)
  const debug = process.env.DOTENVX_DEBUG === 'true'

  // miolo defaults
  const libEnvPath = _get_miolo_config_path(proyEnvPath, appName)
  if (libEnvPath) {
    config({ path: libEnvPath, debug })
  }

  // Maybe miolo defs are on proyect's build folder
  const buildEnvPath = _get_miolo_config_path_on_build(proyEnvPath, srvDest)
  if (buildEnvPath) {
    config({ path: buildEnvPath, debug })
  }
  
  // proyect root config
  if (proyEnvPath) {
    config({ path: path.join(proyEnvPath, '.env'), override: true, debug })
  }
}
