import { miolo } from '../../../src/index.mjs'


async function test_server (authType) {  
  const {makeConfig} = await import('./config.mjs')
  const app = miolo(makeConfig(authType), undefined)
  await app.start()

  return app
}

export default test_server
