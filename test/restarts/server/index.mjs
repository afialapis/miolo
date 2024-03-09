import { miolo } from '../../../src/server/index.mjs'
import { makeConfig } from './config.mjs'

function test_server (dbType) {  

  const app = miolo(makeConfig(dbType), undefined)

  return app
}

export default test_server
