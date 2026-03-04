import assert from "node:assert"
import test from "node:test"

import { test_cli_init } from "#cli/init.mjs"

import TEST01 from "#data/test01.mjs"
import { test_miolo_app_start, test_miolo_conn_get } from "#server/index.mjs"

test(`[miolo-test-routes][postgres]`, async (t) => {
  let app
  let conn
  const fetcher = test_cli_init()

  await t.test(`[miolo-test-routes][postgres] should start app`, async () => {
    app = await test_miolo_app_start()
    conn = await test_miolo_conn_get()

    assert.strictEqual(conn.config.dialect, "postgres")
  })

  await t.test(`[miolo-test-routes][postgres] should prepare database`, async () => {
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
    for (const rec of TEST01) {
      await Test01.insert(rec)
    }
  })

  await t.test(
    `[miolo-test-routes][postgres] should fetch test_01 from crud (read, unfiltered)`,
    async () => {
      const { data } = await fetcher.read(`api/test_01`)
      assert.strictEqual(data.length, TEST01.length)
    }
  )

  await t.test(
    `[miolo-test-routes][postgres] should fetch test_01 from crud (read, filtered by name)`,
    async () => {
      const { data } = await fetcher.read(`api/test_01`, { name: "Peter" })
      assert.strictEqual(data.length, TEST01.filter((r) => r.name === "Peter").length)
    }
  )

  await t.test(
    `[miolo-test-routes][postgres] should fetch test_01 from crud (read, unfiltered) using bodyField`,
    async () => {
      const { rebody } = await fetcher.read(`rebody/test_01`)
      assert.strictEqual(rebody.length, TEST01.length)
    }
  )

  await t.test(
    `[miolo-test-routes][postgres] should fetch test_01 from crud (read, filtered by name) using bodyField`,
    async () => {
      const { rebody } = await fetcher.read(`rebody/test_01`, { name: "Peter" })
      assert.strictEqual(rebody.length, TEST01.filter((r) => r.name === "Peter").length)
    }
  )

  await t.test(
    `[miolo-test-routes][postgres] should fetch test_01 from noauth query (read, unfiltered)`,
    async () => {
      const { data } = await fetcher.get(`noauth/query`)
      assert.strictEqual(data.name, "Peter")
    }
  )

  await t.test(`[miolo-test-routes][postgres] should clean [and close] database`, async () => {
    const query = `DROP TABLE test_01`
    await conn.execute(query)
    conn.close()
  })

  await t.test(`[miolo-test-routes][postgres] should stop server`, async () => {
    await app.stop()
  })
})
