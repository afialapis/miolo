import { miolo } from '../../../src/server/index.mjs'
import { makeConfig } from './config.mjs'

function test_server () {  

  const app = miolo(makeConfig(), undefined)

  return app
}

export default test_server
