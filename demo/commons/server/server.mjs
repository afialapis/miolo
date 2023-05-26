import {miolo} from './miolo-server.mjs'
import demo_server_make_config from './config.mjs'


const demo_server = (buildFolder, authType, render, callback) => {
  const config = demo_server_make_config(buildFolder, authType)
  const app = miolo(config, render, callback)
  return app
}

export default demo_server


