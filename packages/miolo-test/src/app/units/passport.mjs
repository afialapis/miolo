import assert from 'assert'
import test_app_base from "./base.mjs"
import {
  login, 
  logout, 
  insert_todos, 
  insert_fake_todo, 
  count_last_hour_todos,
  remove_todos,
  clean_todos
} from '../cli/api.mjs'
import { TODOS } from '../data.mjs'

const AUTH= {
  username: 'todoer',
  password: 'todoer'
}

const expect = global.expect
let cookie 

function test_app_passport() {

  let fake_tids
  let single_tid
  let last_tid
  test_app_base('passport', (fetcher) => {
    it(`[miolo-test-app][passport] should login`, async function() {
      const resp = await login(fetcher, AUTH)
       
      // IMPORTANT: node-fetch requires special handling for multiple Set-Cookie headers
      // koa-session sends TWO cookies: session + signature
      // headers.get() only returns the first one, we need ALL of them
      
      let cookies = []
      
      // node-fetch v2 uses headers.raw()
      if (resp.response.headers.raw) {
        const setCookies = resp.response.headers.raw()['set-cookie'] || []
        cookies = setCookies.map(c => c.split(';')[0]) // Extract just the name=value part
      } 
      // node-fetch v3+ and other implementations
      else {
        // Some implementations allow iteration
        resp.response.headers.forEach((value, key) => {
          if (key.toLowerCase() === 'set-cookie') {
            cookies.push(value.split(';')[0])
          }
        })
      }
      
      // Join all cookies with '; ' as required by Cookie header format
      cookie = cookies.join('; ')
      
      // console.log('[passport test] Captured cookies:', cookie)
      
      // Save original get_headers to preserve http_auth logic
      const originalGetHeaders = fetcher.get_headers.bind(fetcher)
      
      // Extend get_headers to include cookies
      fetcher.get_headers = () => {
        return {
          ...originalGetHeaders(),
          'Cookie': cookie
        }
      }

      const {user, authenticated} = resp.data
      assert.strictEqual(user.username, AUTH.username)
      assert.strictEqual(authenticated, true)
    })

    it(`[miolo-test-app][passport] should clean todos`, async function() {
      const ok = await clean_todos(fetcher)
      expect(ok).to.be.equal(true)
    })
    
    it(`[miolo-test-app][passport] should insert fake todos`, async function() {
      fake_tids= await insert_todos(fetcher)
      last_tid= Math.max(...fake_tids)
      assert.strictEqual(fake_tids.length, TODOS.length)
    })

    it(`[miolo-test-app][passport] should count last hour todos`, async function() {
      const count= await count_last_hour_todos(fetcher) 
      assert.strictEqual(count, TODOS.length)
    })    

    it(`[miolo-test-app][passport] should remove fake todos`, async function() {
      const res= await remove_todos(fetcher, fake_tids)

      assert.strictEqual(res.length, TODOS.length)
    })
    
    it(`[miolo-test-app][passport] should insert fake single todo`, async function() {
      single_tid= await insert_fake_todo(fetcher)

      assert.strictEqual(single_tid, last_tid+1)
    })


    it(`[miolo-test-app][passport] should remove fake single todo`, async function() {
      const res= await remove_todos(fetcher, [single_tid])

      assert.strictEqual(res.length, 1)
    })

    it(`[miolo-test-app][passport] should logout`, async function() {
      const {authenticated}= await logout(fetcher)
      assert.strictEqual(authenticated, false)
    })    
  })
}

export default test_app_passport