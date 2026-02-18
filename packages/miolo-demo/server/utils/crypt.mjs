import crypto from 'node:crypto'

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



export { sha512 }