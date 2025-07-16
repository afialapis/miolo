import { miolo } from '../../../src/index.mjs'

async function test_server () {  
  const {makeConfig} = await import('./config.mjs')
  const app = miolo(makeConfig(), undefined)

  return app
}

export default test_server
