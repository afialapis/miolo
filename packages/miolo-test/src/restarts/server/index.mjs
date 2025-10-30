import { miolo } from 'miolo'

import {makeConfig} from './config.mjs'

async function test_server () {
  const app = miolo(makeConfig)

  return app
}

export default test_server
