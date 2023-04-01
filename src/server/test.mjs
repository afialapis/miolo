import {miolo} from './server.mjs'

import def_config from './config/defaults.mjs'

miolo(def_config, () => {}, () => {
  process.exit(1)
})