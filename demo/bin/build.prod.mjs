
import fs from 'fs'

import {
  proot,
  APP_NAME,
  CLI_INDEX      ,
  CLI_DEST_FOLDER,
  CLI_DEST_EXT   ,
  SRV_INDEX      ,
  SRV_DEST_FOLDER,
  SRV_DEST_EXT,
  SRV_DEST_MAIN
} from './config.mjs'
import { fix_prod_build } from './utils.mjs';

process.env.NODE_ENV = 'production'

function _app_prod_clean_folder(folder) {
  fs.readdirSync(folder).forEach(file => {
    fs.rmSync(`${folder}/${file}`, { recursive: true, force: true });
  })
}

function _app_prod_clean_all() {
  _app_prod_clean_folder(CLI_DEST_FOLDER)
  _app_prod_clean_folder(SRV_DEST_FOLDER)
}

async function _app_prod_build_cli() {
  const {xeiraBundle}= await import('xeira')

  console.log(`[${APP_NAME}][prod] building client (prod)...`)
  _app_prod_clean_folder(CLI_DEST_FOLDER)

  fs.copyFileSync(proot('./cli/index.html'), proot('./build/cli/index.html'))
  await xeiraBundle({
    source_index: CLI_INDEX,
    target: 'browser',
    bundle_folder: CLI_DEST_FOLDER,
    bundle_name: APP_NAME,
    bundle_extension: CLI_DEST_EXT,
    bundler: 'rollup',
    bundle_node_polyfill: true,
  })
}

async function _app_prod_build_server() {
  const {xeiraBundle}= await import('xeira')

  console.log(`[${APP_NAME}][prod] building server (prod)...`)
  _app_prod_clean_folder(SRV_DEST_FOLDER)
  await xeiraBundle({
    source_index: SRV_INDEX,
    target: 'node',
    bundle_folder: SRV_DEST_FOLDER,
    bundle_name: APP_NAME,
    bundle_extension: SRV_DEST_EXT,
    bundler: 'rollup',
    bundle_node_polyfill: true,
  })
  
  console.log(`[${APP_NAME}][prod] Fixing server build (prod)...`)
  fix_prod_build(SRV_DEST_MAIN)
}

async function _app_prod_build_all() {
  await _app_prod_build_cli()
  await _app_prod_build_server()
}


async function app_prod() {
  const args = process.argv.slice(2)
  const action = args[0]

  if (action == 'clean') {
    _app_prod_clean_all()
  } else if (action == 'build-server') {
    await _app_prod_build_server()
  } else if (action == 'build-cli') {
    await _app_prod_build_cli()
  } else if (action == 'build') {
    await _app_prod_build_all()
  } else {
    console.error(`[${APP_NAME}][prod] Unknown params ${args}`)
  }
}

app_prod()

