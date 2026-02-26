import assert from "node:assert"
import test from "node:test"
import {
  clean_todos,
  insert_fake_todo,
  insert_todos,
  remove_todos,
  set_http_auth
} from "../cli/api.mjs"
import { TODOS } from "../data.mjs"
import { test_app_start, test_app_stop, test_cli_init } from "./common.mjs"

const AUTH = {
  username: "todoer",
  password: "todoer"
}

let fetcher
let fake_tids
let single_tid
let last_tid

test("basic", async (t) => {
  fetcher = test_cli_init()

  await test_app_start("basic")

  await t.test(`[miolo-test-app][basic] should set auth`, async () => {
    set_http_auth(fetcher, AUTH)
    assert.strictEqual(fetcher.http_auth.username, AUTH.username)
  })

  await t.test(`[miolo-test-app][basic] should clean todos`, async () => {
    const ok = await clean_todos(fetcher)
    assert.strictEqual(ok, true)
  })

  await t.test(`[miolo-test-app][basic] should insert fake todos`, async () => {
    fake_tids = await insert_todos(fetcher)
    last_tid = Math.max(...fake_tids)
    assert.strictEqual(fake_tids.length, TODOS.length)
  })

  await t.test(`[miolo-test-app][basic] should remove fake todos`, async () => {
    const res = await remove_todos(fetcher, fake_tids)

    assert.strictEqual(res.length, TODOS.length)
  })

  await t.test(`[miolo-test-app][basic] should insert fake single todo`, async () => {
    single_tid = await insert_fake_todo(fetcher)

    assert.strictEqual(single_tid, last_tid + 1)
  })

  await t.test(`[miolo-test-app][basic] should remove fake single todo`, async () => {
    const res = await remove_todos(fetcher, [single_tid])

    assert.strictEqual(res.length, 1)
  })

  await test_app_stop()
})
