import assert from 'assert'
import test_app_base from "./base.mjs"
import {
  insert_todos,
  insert_fake_todo,
  remove_todos
} from '../cli/api.mjs'
import { TODOS } from '../data.mjs'

function test_app_guest() {

  let fake_tids
  let single_tid
  let last_tid
  test_app_base('guest', (fetcher) => {

    it(`[miolo-test-routes][guest] should insert fake todos`, async function() {
      fake_tids= await insert_todos(fetcher)
      last_tid= Math.max(...fake_tids)
      assert.strictEqual(fake_tids.length, TODOS.length)
    })


    it(`[miolo-test-routes][guest] should remove fake todos`, async function() {
      const res= await remove_todos(fetcher, fake_tids)

      assert.strictEqual(res.length, TODOS.length)
    })

    it(`[miolo-test-routes][guest] should insert fake single todo`, async function() {
      single_tid= await insert_fake_todo(fetcher)

      assert.strictEqual(single_tid, last_tid+1)
    })


    it(`[miolo-test-routes][guest] should remove fake single todo`, async function() {
      const res= await remove_todos(fetcher, [single_tid])

      assert.strictEqual(res.length, 1)
    })
  })
}

export default test_app_guest