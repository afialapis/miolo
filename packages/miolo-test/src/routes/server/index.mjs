import { miolo } from 'miolo'

import {makeConfig} from './config.mjs'

async function test_server () {  
  const app = await miolo(makeConfig)
  await app.start()

  return app
}

export default test_server
