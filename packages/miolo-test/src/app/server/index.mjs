import { miolo } from 'miolo'

import {makeConfig} from './config.mjs'

async function test_server (authMode) {  
  const app = await miolo(makeConfig(authMode))
  await app.start()

  return app
}

export default test_server
