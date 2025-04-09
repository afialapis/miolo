
import fs from 'fs'
import {
  APP_NAME,
  TMP_PID_FILE,
  CLI_DEST_MAIN,
  SRV_DEST_MAIN,
  SRV_NAME
} from './config.mjs'

process.env.NODE_ENV = 'production'


async function _app_prod_start() {
  if (! fs.existsSync(CLI_DEST_MAIN)) {
    console.error(`[${APP_NAME}][prod][start] Cannot start server (prod): CLI bundle does not exist ${CLI_DEST_MAIN}`)
    return
  }
  if (! fs.existsSync(SRV_DEST_MAIN)) {
    console.error(`[${APP_NAME}][prod][start] Cannot start server (prod): SERVER bundle does not exist ${SRV_DEST_MAIN}`)
    return
  }

  console.log(`[${APP_NAME}][prod][start] Starting server (prod)...`)

  const srv_module = await import(SRV_DEST_MAIN)  
  const server = srv_module[SRV_NAME]

  console.log(`[${APP_NAME}][prod][start] Starting server (prod). PID is ${process.pid}...`)
  
  fs.writeFileSync(TMP_PID_FILE, `${process.pid}`, {encoding:'utf8',flag:'w'})

  await server()
}

function _app_prod_stop() {
  console.log(`[${APP_NAME}][prod][stop] Stopping server (prod)...`)

  try {
    const pid = fs.readFileSync(TMP_PID_FILE, {encoding:'utf8'})
    console.log(`[${APP_NAME}][prod][stop] Killing current process with PID ${pid}`)

    process.kill(pid, 'SIGKILL')
  } catch(_) {
    console.log(`[${APP_NAME}][prod][stop] No current process to kill`)
    console.error(_)
  }

}

async function _app_prod_restart() {
  console.log(`[${APP_NAME}][prod][restart] Restarting server (prod)...`)
  _app_prod_stop()
  await _app_prod_start()
}

async function app_prod() {
  const args = process.argv.slice(2)
  const action = args[0]

  if (action == 'start') {
    await _app_prod_start()
  } else if (action == 'stop') {
    _app_prod_stop()
  } else if (action == 'restart') {
    await _app_prod_restart()
  } else {
    console.error(`[${APP_NAME}][prod] Unknown params ${args}`)
  }
}

app_prod()

