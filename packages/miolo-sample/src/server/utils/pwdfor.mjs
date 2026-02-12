import { sha512 } from './crypt.mjs'

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

function _loadSalt() {
  let dir = path.dirname(fileURLToPath(import.meta.url))
  while (dir !== path.parse(dir).root && !fs.existsSync(path.join(dir, 'package.json'))) {
    dir = path.dirname(dir)
  }
  const env = fs.readFileSync(path.join(dir, '.env'), 'utf8')
  return env.match(/^MIOLO_SESSION_SALT=(.*)$/m)?.[1]?.trim()
}




async function _pwd_for() {
  const args = process.argv.slice(2)
  const pwd = args[0]

  const salt = _loadSalt()

  const cpwd = sha512(pwd, salt)
  console.log([salt, cpwd])
}

_pwd_for()
