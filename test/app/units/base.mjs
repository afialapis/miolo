import assert from 'assert'
import fetch from 'node-fetch'
import test_server from '../server/index.mjs'
import {miolo_client} from '../../../src/cli/index.mjs'

function test_app_base (authType, callback) {  

  let app
  //let conn
  const {fetcher} = miolo_client({
    hostname: 'localhost',
    port: 8001
  })
  global.fetch = fetch


  describe(`[miolo-test-app][${authType}]`, function() {

    it(`[miolo-test-app][${authType}] should start app`, async function() {
      app = await test_server(authType)
      //conn = app.context.miolo.db.getConnection()

      assert.strictEqual(app.context.miolo.config.auth_type, authType)
    })

    callback(fetcher)

    it(`[miolo-test-app][${authType}] should stop server`, async function() {
      app.context.miolo.logger.info(`[miolo-test-app] Let's stop the server...`)
      await app.stop_server()
    })
  })
}


export default test_app_base
