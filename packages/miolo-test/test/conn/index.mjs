import assert from "node:assert"
import test from "node:test"

import TEST01 from "#data/test01.mjs"
import { test_db_conn_drop, test_db_conn_init } from "#server/db-conn.mjs"

test(`[miolo-test-db-conn][postgres]`, async (t) => {
  let conn

  await t.test(`[miolo-test-db-conn][postgres] should init db connection`, async () => {
    conn = await test_db_conn_init()

    assert.strictEqual(conn.config.dialect, "postgres")
  })

  await t.test(`[miolo-test-db-conn][postgres] should prepare database`, async () => {
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
    `[miolo-test-db-conn][postgres] should fetch test_01 from crud (read, unfiltered)`,
    async () => {
      const data = await conn.select(`SELECT * FROM test_01`)
      assert.strictEqual(data.length, TEST01.length)
    }
  )

  await t.test(`[miolo-test-db-conn][postgres] should close db connection`, async () => {
    conn.close()
  })

  await t.test(`[miolo-test-db-conn][postgres] should drop db connection`, async () => {
    await test_db_conn_drop()
  })
})
