import assert from 'assert'
import fetch from 'node-fetch'
import test_server from '../server/index.mjs'
import {miolo_client} from 'miolo-cli'

import {users_make_table_from_conn} from '../server/db/users.mjs'
import {todos_make_table_from_conn} from '../server/db/todos.mjs'

function test_app_base (authMode, callback) {  

  let app
  //let conn
  const {fetcher} = miolo_client({
    config: {
      hostname: 'localhost',
      port: 8001,
      force_hostname: true
    }
  })
  global.fetch = fetch


  describe(`[miolo-test-app][${authMode}]`, function() {
    this.timeout(3000)

    it(`[miolo-test-app][${authMode}] should start app`, async function() {
      app = await test_server(authMode)
      assert.strictEqual(app.context.miolo.config[authMode].enabled, true)
    })

    it(`[miolo-test-app][${authMode}] should prepare database`, async function() {
      const conn = await app.context.miolo.db.get_connection()
      await users_make_table_from_conn(conn)
      await todos_make_table_from_conn(conn)
    })

    callback(fetcher)

    it(`[miolo-test-app][${authMode}] should stop server`, async function() {
      app.context.miolo.logger.info(`[miolo-test-app] Let's stop the server...`)
      await app.stop()
    })
  })
}


export default test_app_base
