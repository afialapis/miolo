import redis from 'redis'
import { promisify } from 'util'
import { red, magenta } from 'tinguir'

function init_cacher(config) {

  const client = redis.createClient(config.redis.port, config.redis.host)
                .on('connect', function () {
                  console.info(`${magenta('REDIS')} Connection established!`)
                })
                .on('error', function (err) {
                  let msg
                  try {
                    if (err instanceof redis.ReplyError)
                      msg = `${magenta('REDIS')} ${red('Error ' + err.code)} Command: ${err.command} ${err.toString()}`
                    else
                      msg = `${magenta('REDIS')} ${red('Error ' + err.code)} ${err.toString()}`
                  } catch(e) {
                    msg = `${magenta('REDIS')} ${red('Error ')} ${e}`
                  }
                  console.error(msg)
                })

  const _getKey    = promisify(client.get).bind(client)
  const _existsKey = promisify(client.exists).bind(client)
  const _setKey   = promisify(client.set).bind(client)
  const _delKey    = promisify(client.del).bind(client)

  async function redisGet (key) {
    return await _getKey(key)
  }

  async function redisExists(key) {
    const r= await _existsKey(key)
    return r==1 ? true : false
  }

  async function redisSet(key, value, expiration = 86400) {
    const r= await _setKey(key, value, 'EX', expiration)
    return r == 'OK' ? true : false
  }

  async function redisDel(key) {
    const r= await _delKey(key)
    return r >= 1 ? true : false
  }

  const cacher= {
    get: redisGet,
    exists: redisExists,
    set: redisSet,
    del: redisDel
  }

  return cacher

}



export { init_cacher }