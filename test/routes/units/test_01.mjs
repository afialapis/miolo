import assert from 'assert'
import fetch from 'node-fetch'
import data from '../config/data.mjs'
import test_server from '../config/server/index.mjs'
import {Fetcher} from '../../../src/cli/fetcher/index.mjs'


function test_01 (dbType) {  

  let app
  let conn
  const fetcher = new Fetcher()
  global.fetch = fetch
  const baseUrl= 'http://localhost:8001'


  describe(`[miolo-test][${dbType}]`, function() {

    it(`[miolo-test][${dbType}] should start app`, async function() {
      app = await test_server(dbType)
      conn = app.context.miolo.db.getConnection(dbType)

      assert.strictEqual(conn.config.dialect, dbType)
    })

    it(`[miolo-test][${dbType}] should prepare database`, async function() {
      
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

      const Test01 = conn.getModel('test_01')
      for (const rec of data) {
        await Test01.insert(rec)
      }
    })

    it(`[miolo-test][${dbType}] should fetch test_01 from crud (read, unfiltered)`, async function() {
      const response= await fetcher.read(`${baseUrl}/api/test_01`)
      assert.strictEqual(response.length, data.length)
    })

    it(`[miolo-test][${dbType}] should fetch test_01 from crud (read, filtered by name)`, async function() {
      const response= await fetcher.read(`${baseUrl}/api/test_01`, {name: 'Peter'})
      assert.strictEqual(response.length, data.filter(r => r.name=='Peter').length)
    })

    it(`[miolo-test][${dbType}] should fetch test_01 from crud (read, unfiltered) using bodyField`, async function() {
      const response= await fetcher.read(`${baseUrl}/rebody/test_01`)
      const res = response['rebody']
      assert.strictEqual(res.length, data.length)
    })
    
    it(`[miolo-test][${dbType}] should fetch test_01 from crud (read, filtered by name) using bodyField`, async function() {
      const response= await fetcher.read(`${baseUrl}/rebody/test_01`, {name: 'Peter'})
      const res = response['rebody']

      assert.strictEqual(res.length, data.filter(r => r.name=='Peter').length)
    })


    it(`[miolo-test][${dbType}] should fetch test_01 from query noauth (read, unfiltered)`, async function() {
      const response= await fetcher.get(`${baseUrl}/noauth/query`)
      const data= response.data
      assert.strictEqual(data.name, 'Peter')
    })

    it(`[miolo-test][${dbType}] should fetch test_01 from query auth (returns error)`, async function() {
      const response= await fetcher.get(`${baseUrl}/auth/query`)
      assert.strictEqual(response.status, 404)
    })

    it(`[miolo-test][${dbType}] should clean [and close] database`, async function() {
      const query = `DROP TABLE test_01`
      await conn.execute(query)
      conn.close()
    })

    it(`[miolo-test][${dbType}] should stop server`, async function() {
      app.context.miolo.logger.info(`[miolo-test] Let's stop the server...`)
      await app.stop_server()
    })
  })
}


export default test_01