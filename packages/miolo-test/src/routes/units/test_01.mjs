import assert from 'assert'
import fetch from 'node-fetch'
import {miolo_client} from 'miolo-cli'

import data from '../data.mjs'
import test_server from '../server/index.mjs'

const dbType = 'postgres'

function test_01 () {  

  let app
  let conn
  const {fetcher} = miolo_client({
    config: {
      hostname: 'localhost',
      port: 8001,
      force_hostname: true
    }
  })
  global.fetch = fetch


  describe(`[miolo-test-routes][${dbType}]`, function() {
    this.timeout(3000)

    it(`[miolo-test-routes][${dbType}] should start app`, async function() {
      app = await test_server(dbType)
      conn = await app.context.miolo.db.get_connection(dbType, {
        reset: true
      })

      assert.strictEqual(conn.config.dialect, dbType)
    })

    it(`[miolo-test-routes][${dbType}] should prepare database`, async function() {
      
      let query = `DROP TABLE IF EXISTS test_01`
      await conn.execute(query)
      query = `
        CREATE TABLE test_01 (
          id           serial,
          name         TEXT NOT NULL,
          description  TEXT NULL,
          counter      INTEGER
        )`
      await conn.execute(query)

      const Test01 = await conn.get_model('test_01')
      for (const rec of data) {
        await Test01.insert(rec)
      }
    })

    it(`[miolo-test-routes][${dbType}] should fetch test_01 from crud (read, unfiltered)`, async function() {
      const {data}= await fetcher.read(`api/test_01`)
      assert.strictEqual(data.length, data.length)
    })
    
    it(`[miolo-test-routes][${dbType}] should fetch test_01 from crud (read, filtered by name)`, async function() {
      const {data}= await fetcher.read(`api/test_01`, {name: 'Peter'})
      assert.strictEqual(data.length, data.filter(r => r.name=='Peter').length)
    })

    it(`[miolo-test-routes][${dbType}] should fetch test_01 from crud (read, unfiltered) using bodyField`, async function() {
      const {rebody}= await fetcher.read(`rebody/test_01`)
      assert.strictEqual(rebody.length, data.length)
    })
    
    it(`[miolo-test-routes][${dbType}] should fetch test_01 from crud (read, filtered by name) using bodyField`, async function() {
      const {rebody}= await fetcher.read(`rebody/test_01`, {name: 'Peter'})
      assert.strictEqual(rebody.length, data.filter(r => r.name=='Peter').length)
    })


    it(`[miolo-test-routes][${dbType}] should fetch test_01 from foo query (read, unfiltered)`, async function() {
      const {data}= await fetcher.get(`foo/query`)
      assert.strictEqual(data.name, 'Peter')
    })

    it(`[miolo-test-routes][${dbType}] should clean [and close] database`, async function() {
      const query = `DROP TABLE test_01`
      await conn.execute(query)
      conn.close()
    })

    it(`[miolo-test-routes][${dbType}] should stop server`, async function() {
      app.context.miolo.logger.info(`[miolo-test-routes] Let's stop the server...`)
      await app.stop()
    })
  })
}


export default test_01