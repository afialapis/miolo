import { miolo } from '../../../src/server/index.mjs'
import { makeConfig } from './config.mjs'


async function test_server (authType) {  

  const app = await miolo(makeConfig(authType), undefined).run()

  return app
}

export default test_server
