import assert from 'assert'
import data from '../data.mjs'
import test_server from '../server/index.mjs'

const dbType= 'postgres'
let app
let conn


export function test_restarts_server_start () {  

  describe(`[miolo-test-restarts][server][start]`, function() {

    it(`[miolo-test-restarts][server] should start app`, async function() {
      app = test_server(dbType)
      await app.start()
      conn = await app.context.miolo.db.getConnection(dbType, {
        reset: true
      })

      assert.strictEqual(conn.config.dialect, dbType)
    })

    it(`[miolo-test-restarts][server] should prepare database`, async function() {
      
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

      const Test01 = await conn.getModel('test_01')
      for (const rec of data) {
        await Test01.insert(rec)
      }
    })
  })
}

export function test_restarts_server_restart() {
  describe(`[miolo-test-restarts][server][restart]`, function() {
    it(`[miolo-test-restarts][server][restart] should restart server`, async function() {
      app.context.miolo.logger.info(`[miolo-test-restarts][server][restart] Let's restart the server...`)
      await app.restart()
    })
  })
}

export function test_restarts_server_stop() {
  describe(`[miolo-test-restarts][server][stop]`, function() {
    it(`[miolo-test-restarts][server][stop] should stop server`, async function() {
      app.context.miolo.logger.info(`[miolo-test-restarts][server] Let's stop the server...`)
      await app.stop()
    })
  })
}