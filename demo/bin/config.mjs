import path from 'path'
import { fileURLToPath } from 'url'

const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)
process.env.NODE_ROOT = path.resolve(__my_dirname, '..')

export const proot = (p) => path.join(process.env.NODE_ROOT, p)

export const APP_NAME = 'miolo-demo'
export const TMP_PID_FILE = `/tmp/${APP_NAME}.pid`
export const CLI_INDEX = './cli/entry-cli.jsx'
export const CLI_DEST_FOLDER = './build/cli'
export const CLI_DEST_EXT = 'iife.bundle' // 'iife.bundle.min'
export const CLI_DEST_EXT_DEV = 'iife.bundle'
export const CLI_DEST_MAIN = proot(`${CLI_DEST_FOLDER}/${APP_NAME}.${CLI_DEST_EXT}.js`)
export const SRV_INDEX = './server/server-prod.mjs'
export const SRV_INDEX_DEV = './server/server-dev.mjs'
export const SRV_DEST_FOLDER = './build/server'
export const SRV_DEST_EXT = 'node.bundle.mjs'
export const SRV_DEST_MAIN = proot(`${SRV_DEST_FOLDER}/${APP_NAME}.${SRV_DEST_EXT}`)
export const SRV_NAME = 'miolo_demo_server'
export const SRV_WATCH_IGNORE = proot('cli/assets') // https://github.com/paulmillr/chokidar?tab=readme-ov-file#performance

