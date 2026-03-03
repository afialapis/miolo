import assert from "node:assert"
import test from "node:test"
import { test_miolo_get_app, test_miolo_get_conn, test_miolo_server_init } from "./app.mjs"
import { test_miolo_client } from "./cli.mjs"
import data from "./data.mjs"

test("restarts", async (t) => {
  await test_miolo_server_init()
  const app = await test_miolo_get_app()
  const conn = await test_miolo_get_conn()
  let random_value
  const fetcher = test_miolo_client()

  await t.test("[miolo-test-restarts][server] should check app and conn", async () => {
    assert.strictEqual(conn.config.dialect, "postgres")
  })

  await t.test(`[miolo-test-restarts][server] should prepare database`, async () => {
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
    `[miolo-test-restarts][server][cache-set] should set some value on cache`,
    async () => {
      random_value = Math.random().toString()

      const cache = await app.context.miolo.cache.get_cache("test")
      await cache.setItem("test-value", random_value)
    }
  )

  await t.test(
    `[miolo-test-restarts][server][cache-check] should check some value on cache`,
    async () => {
      const cache = await app.context.miolo.cache.get_cache("test")
      const value = await cache.getItem("test-value")
      assert.strictEqual(value, random_value)
    }
  )

  await t.test(
    `[miolo-test-restarts][client] should fetch test_01 from crud (read, unfiltered)`,
    async () => {
      const { data } = await fetcher.read(`api/test_01`)
      assert.strictEqual(data.length, data.length)
    }
  )

  await t.test(
    `[miolo-test-restarts][client] should fetch test_01 from crud (read, filtered by name)`,
    async () => {
      const { data } = await fetcher.read(`api/test_01`, { name: "Peter" })
      assert.strictEqual(data.length, data.filter((r) => r.name === "Peter").length)
    }
  )

  await t.test(`[miolo-test-restarts][server][restart] should restart server`, async () => {
    await app.restart()
  })

  await t.test(
    `[miolo-test-restarts][server][cache-check] should check some value on cache`,
    async () => {
      const cache = await app.context.miolo.cache.get_cache("test")
      const value = await cache.getItem("test-value")

      if (cache.options.type === "memory") {
        assert.strictEqual(value, undefined)
      } else {
        assert.strictEqual(value, random_value)
      }
    }
  )

  await t.test(
    `[miolo-test-restarts][client] should fetch test_01 from crud (read, unfiltered)`,
    async () => {
      const { data } = await fetcher.read(`api/test_01`)
      assert.strictEqual(data.length, data.length)
    }
  )

  await t.test(
    `[miolo-test-restarts][client] should fetch test_01 from crud (read, filtered by name)`,
    async () => {
      const { data } = await fetcher.read(`api/test_01`, { name: "Peter" })
      assert.strictEqual(data.length, data.filter((r) => r.name === "Peter").length)
    }
  )

  await t.test(`[miolo-test-restarts][server][restart] should restart server`, async () => {
    await app.restart()
  })

  await t.test(`[miolo-test-restarts][server][restart] should restart server`, async () => {
    await app.restart()
  })

  await t.test(
    `[miolo-test-restarts][server][cache-check] should check some value on cache`,
    async () => {
      const cache = await app.context.miolo.cache.get_cache("test")
      const value = await cache.getItem("test-value")

      if (cache.options.type === "memory") {
        assert.strictEqual(value, undefined)
      } else {
        assert.strictEqual(value, random_value)
      }
    }
  )

  await t.test(
    `[miolo-test-restarts][client] should fetch test_01 from crud (read, unfiltered)`,
    async () => {
      const { data } = await fetcher.read(`api/test_01`)
      assert.strictEqual(data.length, data.length)
    }
  )

  await t.test(
    `[miolo-test-restarts][client] should fetch test_01 from crud (read, filtered by name)`,
    async () => {
      const { data } = await fetcher.read(`api/test_01`, { name: "Peter" })
      assert.strictEqual(data.length, data.filter((r) => r.name === "Peter").length)
    }
  )

  await t.test(`[miolo-test-restarts][server][stop] should stop server`, async () => {
    app.context.miolo.logger.info(`[miolo-test-restarts][server] Let's stop the server...`)
    await app.stop()
  })

  await t.test(`[miolo-test-restarts][server][stop] should stop server`, async () => {
    app.context.miolo.logger.info(`[miolo-test-restarts][server] Let's stop the server...`)
    await app.stop()
  })

  await t.test(
    `[miolo-test-restarts][client] should check server is no longer available`,
    async () => {
      const { error } = await fetcher.read(`api/test_01`)
      assert.strictEqual(error.message.includes("fetch failed"), true)
    }
  )
})
