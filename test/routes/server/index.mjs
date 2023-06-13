import { miolo } from '../../../src/server/index.mjs'
import { makeConfig } from './config.mjs'


async function test_server (dbType) {  

  const app = await miolo(makeConfig(dbType), undefined).run()

  return app
}

export default test_server
