import assert from "node:assert"
import test from "node:test"
import {
  clean_todos,
  count_last_hour_todos,
  insert_fake_todo,
  insert_todos,
  login,
  logout,
  remove_todos
} from "../cli/api.mjs"
import { TODOS } from "../data.mjs"
import { test_app_start, test_app_stop, test_cli_init } from "./common.mjs"

const AUTH = {
  username: "todoer",
  password: "todoer"
}

let fetcher
let cookie
let fake_tids
let single_tid
let last_tid

test("passport", async (t) => {
  fetcher = test_cli_init()

  await test_app_start("passport")

  await t.test(`[miolo-test-app][passport] should login`, async () => {
    const resp = await login(fetcher, AUTH)

    // IMPORTANT: node-fetch requires special handling for multiple Set-Cookie headers
    // koa-session sends TWO cookies: session + signature
    // headers.get() only returns the first one, we need ALL of them

    let cookies = []

    // node-fetch v2 uses headers.raw()
    if (resp.response.headers.raw) {
      const setCookies = resp.response.headers.raw()["set-cookie"] || []
      cookies = setCookies.map((c) => c.split(";")[0]) // Extract just the name=value part
    }
    // node-fetch v3+ and other implementations
    else {
      // Some implementations allow iteration
      resp.response.headers.forEach((value, key) => {
        if (key.toLowerCase() === "set-cookie") {
          cookies.push(value.split(";")[0])
        }
      })
    }

    // Join all cookies with '; ' as required by Cookie header format
    cookie = cookies.join("; ")

    // console.log('[passport test] Captured cookies:', cookie)

    // Save original get_headers to preserve http_auth logic
    const originalGetHeaders = fetcher.get_headers.bind(fetcher)

    // Extend get_headers to include cookies
    fetcher.get_headers = () => {
      return {
        ...originalGetHeaders(),
        Cookie: cookie
      }
    }

    const { user, authenticated } = resp.data
    assert.strictEqual(user.username, AUTH.username)
    assert.strictEqual(authenticated, true)
  })

  await t.test(`[miolo-test-app][passport] should clean todos`, async () => {
    const ok = await clean_todos(fetcher)
    assert.strictEqual(ok, true)
  })

  await t.test(`[miolo-test-app][passport] should insert fake todos`, async () => {
    fake_tids = await insert_todos(fetcher)
    last_tid = Math.max(...fake_tids)
    assert.strictEqual(fake_tids.length, TODOS.length)
  })

  await t.test(`[miolo-test-app][passport] should count last hour todos`, async () => {
    const count = await count_last_hour_todos(fetcher)
    assert.strictEqual(count, TODOS.length)
  })

  await t.test(`[miolo-test-app][passport] should remove fake todos`, async () => {
    const res = await remove_todos(fetcher, fake_tids)

    assert.strictEqual(res.length, TODOS.length)
  })

  await t.test(`[miolo-test-app][passport] should insert fake single todo`, async () => {
    single_tid = await insert_fake_todo(fetcher)

    assert.strictEqual(single_tid, last_tid + 1)
  })

  await t.test(`[miolo-test-app][passport] should remove fake single todo`, async () => {
    const res = await remove_todos(fetcher, [single_tid])

    assert.strictEqual(res.length, 1)
  })

  await t.test(`[miolo-test-app][passport] should logout`, async () => {
    const { authenticated } = await logout(fetcher)
    assert.strictEqual(authenticated, false)
  })

  await t.test(`[miolo-test-app][passport] should stop server`, async () => {
    await test_app_stop()
  })
})
