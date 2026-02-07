import crypto from 'node:crypto'

const PASSWORD_LENGTH = 18
const LOWERCASE_ALPHABET = 'abcdefghijklmnopqrstuvwxyz' // 26 chars
const UPPERCASE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // 26 chars
const NUMBERS = '0123456789' // 10 chars
const SYMBOLS = ',./<>?;\'":[]\\|}{=-_+`~!@#$%^&*()' // 32 chars
const ALPHANUMERIC_CHARS = LOWERCASE_ALPHABET + UPPERCASE_ALPHABET + NUMBERS // 62 chars
const ALL_CHARS = ALPHANUMERIC_CHARS + SYMBOLS // 94 chars


/**
 * Hash the password
 * @private
 * @param str {string}
 * @param options {object}
 * @returns {string}
 */
function sha512(str, salt) {
  return crypto.createHmac('sha512', salt).update(str).digest('hex')
}


function _generateRandomPassword(length, alphabet) {

  let rb = crypto.randomBytes(length)
  let rp = ""

  for (let i = 0; i < length; i++) {
    rb[i] = rb[i] % alphabet.length
    rp += alphabet[rb[i]]
  }
  
  return rp
}

function generateRandomPassword() {
  return _generateRandomPassword(PASSWORD_LENGTH, ALL_CHARS)
}

export { sha512, generateRandomPassword }