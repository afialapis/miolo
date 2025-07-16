import { miolo } from '../../../src/index.mjs'


async function test_server () {  
  const {config} = await import('./config.mjs')
  const app = miolo(config, undefined)
  await app.start()

  return app
}

export default test_server
