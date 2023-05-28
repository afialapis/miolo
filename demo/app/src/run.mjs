// import { exec } from "child_process"
//import miolo_demo_app_server from "./server/server"
import path from 'path'
import { fileURLToPath } from 'url'
import demo_server from '../../commons/server/server.mjs'
import {miolo_demo_app_client_guest} from './cli/guest.mjs'
import {miolo_demo_app_client_basic_auth} from './cli/basic.mjs'
import {miolo_demo_app_client_passport} from './cli/passport.mjs'

const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)

const BUILD_DIR = path.resolve(__my_dirname, '../build')

// const _kill_nodemon = ( ) => exec(`kill $(ps aux | grep 'node' | awk '{print $2}')`)

const _run_guest = () => {
  demo_server(BUILD_DIR, 'guest', 'postgres', undefined, undefined, async (app) => {
    app.context.miolo.logger.info(`Demo App (Guest) -- Server is running. Let's run now the client...`)
    await miolo_demo_app_client_guest()

    app.context.miolo.logger.info(`Demo App (Guest) -- Cli run! Let's stop the server...`)
    app.stop_server()
    //_kill_nodemon()
    process.exit(1)
  })
}

const _run_basic = () => {
  demo_server(BUILD_DIR, 'basic', 'postgres', undefined, undefined, async (app) => {
    app.context.miolo.logger.info(`Demo App (Basic) -- Server is running. Let's run now the client...`)

    await miolo_demo_app_client_basic_auth()
      
    app.context.miolo.logger.info(`Demo App (Basic) -- Cli run! Let's stop the server...`)
    app.stop_server()
    //_kill_nodemon()
    process.exit(1)
  })
}

const _run_passport = () => {
  demo_server(BUILD_DIR, 'passport', 'postgres', undefined, undefined, async (app) => {
    app.context.miolo.logger.info(`Demo App (Passport) -- Server is running. Let's run now the client...`)

    await miolo_demo_app_client_passport()
      
    app.context.miolo.logger.info(`Demo App (Passport) -- Cli run! Let's stop the server...`)
    app.stop_server()
    //_kill_nodemon()
    process.exit(1)
  })
}

const demo_app = (mode) => {

  if (mode=='--passport') {
    _run_passport()
  } else if (mode == '--basic') {
    _run_basic()
  } else {
    _run_guest()
  }
}

export {demo_app}