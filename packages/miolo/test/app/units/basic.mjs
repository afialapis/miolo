import assert from 'assert'
import test_app_base from "./base.mjs"
import {
  set_auth,
  insert_todos,
  insert_fake_todo,
  remove_todos,
  clean_todos
} from '../cli/api.mjs'
import { TODOS } from '../data.mjs'

const AUTH= {
  username: 'todoer',
  password: 'todoer'
}

function test_app_basic() {

  let fake_tids
  let single_tid
  let last_tid
  test_app_base('basic', (fetcher) => {

    it(`[miolo-test-app][basic] should set auth`, async function() {
      set_auth(fetcher, AUTH)
      assert.strictEqual(fetcher.auth.username, AUTH.username)
    })

    it(`[miolo-test-app][basic] should clean todos`, async function() {
      await clean_todos(fetcher)
    })

    it(`[miolo-test-app][basic] should insert fake todos`, async function() {
      fake_tids= await insert_todos(fetcher)
      last_tid= Math.max(...fake_tids)
      assert.strictEqual(fake_tids.length, TODOS.length)
    })

    
    it(`[miolo-test-app][basic] should remove fake todos`, async function() {
      const res= await remove_todos(fetcher, fake_tids)

      assert.strictEqual(res.length, TODOS.length)
    })

    it(`[miolo-test-app][basic] should insert fake single todo`, async function() {
      single_tid= await insert_fake_todo(fetcher)

      assert.strictEqual(single_tid, last_tid+1)
    })


    it(`[miolo-test-app][basic] should remove fake single todo`, async function() {
      const res= await remove_todos(fetcher, [single_tid])

      assert.strictEqual(res.length, 1)
    })
  })
}

export default test_app_basic