import assert from 'assert'
import fetch from 'node-fetch'
import data from '../data.mjs'
import {miolo_client} from '../../../src/cli/index.mjs'

const {fetcher} = miolo_client({
  config: {
    hostname: 'localhost',
    port: 8001,
    force_hostname: true,
    silent_fail: true
  }
})
global.fetch = fetch


export function test_restarts_client () {  

  describe(`[miolo-test-restarts][client]`, function() {
    it(`[miolo-test-restarts][client] should fetch test_01 from crud (read, unfiltered)`, async function() {
      const response= await fetcher.read(`api/test_01`)
      assert.strictEqual(response.length, data.length)
    })
    
    it(`[miolo-test-restarts][client] should fetch test_01 from crud (read, filtered by name)`, async function() {
      const response= await fetcher.read(`api/test_01`, {name: 'Peter'})
      assert.strictEqual(response.length, data.filter(r => r.name=='Peter').length)
    })
  })
}

export function test_restarts_client_fail () {  

  describe(`[miolo-test-restarts][client]`, function() {
    it(`[miolo-test-restarts][client] should check server is no longer available`, async function() {
      const response= await fetcher.read(`api/test_01`)
      assert.strictEqual(response.code, 'ECONNREFUSED')
    })
    

  })
}
