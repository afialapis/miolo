import { config } from '@dotenvx/dotenvx'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

function _find_closest_package_json(dir) {
  if (fs.existsSync(path.join(dir, 'package.json'))) {
    return dir
  }
  const parentDir = path.dirname(dir)
  if (parentDir === dir) {
    return null
  }
  return _find_closest_package_json(parentDir)
}


function _get_miolo_config_path() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  return path.join(__dirname, '.env')    
}


export function init_env_config() {

  const debug = process.env.DOTENVX_DEBUG === 'true'

  // miolo defaults
  const libEnvPath = _get_miolo_config_path()
  config({ path: libEnvPath, debug })

  // proyect config
  const proyEnvPath = _find_closest_package_json(process.cwd())
  if (proyEnvPath) {
    config({ path: path.join(proyEnvPath, '.env'), override: true, debug })
  }
}
