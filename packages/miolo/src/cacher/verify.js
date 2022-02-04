import { make_cacher } from './index'

async function verify_cacher(config) {
  const cacher= make_cacher(config)
  const rs = await cacher.set('test', 'I will be expired in 10 seconds', 10)
  if (! rs)
    console.warning('[miolo][Verify][REDIS] Verifying error: Redis could not be tested (S)!')
  else {
    const rd = await cacher.del('test')
    if (! rd)
      console.warning('[miolo][Verify][REDIS] Verifying error: Redis could not be tested (D)!')
    else {
      console.info('[miolo][Verify][REDIS] Verifying: Redis Tested OK')
      return true
    }
  }
  return false
}

export {verify_cacher}