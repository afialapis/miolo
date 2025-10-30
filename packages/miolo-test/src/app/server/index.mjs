import { miolo } from 'miolo'

import {makeConfig} from './config.mjs'

async function test_server (authType) {  
  const app = await miolo(makeConfig(authType))
  await app.start()

  return app
}

export default test_server
