import { miolo } from '../../../src/server/index.mjs'
import { makeConfig } from './config.mjs'


async function test_server () {  

  const app = miolo(makeConfig(), undefined)
  await app.start()

  return app
}

export default test_server
