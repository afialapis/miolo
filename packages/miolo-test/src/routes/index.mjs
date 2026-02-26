import assert from "node:assert"
import test from "node:test"
import { miolo_client } from "miolo-cli"
import data from "./data.mjs"
import test_server from "./server/index.mjs"

const dbType = "postgres"

let app
let conn
const { fetcher } = miolo_client({
  config: {
    hostname: "localhost",
    port: 8001,
    force_hostname: true
  }
})

test(`[miolo-test-routes][${dbType}]`, async (t) => {
  await t.test(`[miolo-test-routes][${dbType}] should start app`, async () => {
    app = await test_server(dbType)
    conn = await app.context.miolo.db.get_connection(dbType, {
      reset: true
    })

    assert.strictEqual(conn.config.dialect, dbType)
  })

  await t.test(`[miolo-test-routes][${dbType}] should prepare database`, async () => {
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

    const Test01 = await conn.get_model("test_01")
    for (const rec of data) {
      await Test01.insert(rec)
    }
  })

  await t.test(
    `[miolo-test-routes][${dbType}] should fetch test_01 from crud (read, unfiltered)`,
    async () => {
      const { data } = await fetcher.read(`api/test_01`)
      assert.strictEqual(data.length, data.length)
    }
  )

  await t.test(
    `[miolo-test-routes][${dbType}] should fetch test_01 from crud (read, filtered by name)`,
    async () => {
      const { data } = await fetcher.read(`api/test_01`, { name: "Peter" })
      assert.strictEqual(data.length, data.filter((r) => r.name === "Peter").length)
    }
  )

  await t.test(
    `[miolo-test-routes][${dbType}] should fetch test_01 from crud (read, unfiltered) using bodyField`,
    async () => {
      const { rebody } = await fetcher.read(`rebody/test_01`)
      assert.strictEqual(rebody.length, data.length)
    }
  )

  await t.test(
    `[miolo-test-routes][${dbType}] should fetch test_01 from crud (read, filtered by name) using bodyField`,
    async () => {
      const { rebody } = await fetcher.read(`rebody/test_01`, { name: "Peter" })
      assert.strictEqual(rebody.length, data.filter((r) => r.name === "Peter").length)
    }
  )

  await t.test(
    `[miolo-test-routes][${dbType}] should fetch test_01 from foo query (read, unfiltered)`,
    async () => {
      const { data } = await fetcher.get(`foo/query`)
      assert.strictEqual(data.name, "Peter")
    }
  )

  await t.test(`[miolo-test-routes][${dbType}] should clean [and close] database`, async () => {
    const query = `DROP TABLE test_01`
    await conn.execute(query)
    conn.close()
  })

  await t.test(`[miolo-test-routes][${dbType}] should stop server`, async () => {
    await app.stop()
  })
})
