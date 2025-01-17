import assert from 'assert'
import data from '../data.mjs'
import test_server from '../server/index.mjs'

const dbType= 'postgres'
let app
let conn
let random_value

export function test_restarts_server_start () {  

  describe(`[miolo-test-restarts][server][start]`, function() {
    this.timeout(3000)

    it(`[miolo-test-restarts][server] should start app`, async function() {
      app = test_server(dbType)
      await app.start()
      conn = await app.context.miolo.db.get_connection(dbType, {
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

      const Test01 = await conn.get_model('test_01')
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

export function test_restarts_server_cache_set() {
  describe(`[miolo-test-restarts][server][cache-set]`, function() {
    it(`[miolo-test-restarts][server][cache-set] should set some value on cache`, async function() {
      // app.context.miolo.logger.info(`[miolo-test-restarts][server] Let's save some value on cache...`)
      random_value = Math.random().toString()
      
      const cache = await app.context.miolo.cache.get_cache('test')
      await cache.setItem('test-value', random_value)
    })
  })
}

export function test_restarts_server_cache_check() {
  describe(`[miolo-test-restarts][server][cache-check]`, function() {
    it(`[miolo-test-restarts][server][cache-check] should check some value on cache`, async function() {
      // app.context.miolo.logger.info(`[miolo-test-restarts][server] Let's check some value on cache...`)

      const cache = await app.context.miolo.cache.get_cache('test')
      const value = await cache.getItem('test-value')
      assert.strictEqual(value, random_value)
    })
  })
}