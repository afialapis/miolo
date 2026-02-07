
import {cyan, gray_light, yellow, red} from 'tinguir'

function _msg(msg, prefix) {
  const _m = typeof msg === 'string' ? msg : JSON.stringify(msg || '')
  return `${prefix ? `[${prefix}]` : ''} ${_m}`
}

// export function mioloLog(msg, prefix = 'app') {
//   console.log(`\u001b[0;34m${_msg(msg, prefix)}\u001b[0;39m`)
// }
// 
// export function mioloLogDebug(msg, prefix = 'app') {
//   console.log(`\u001b[38;5;244m${_msg(msg, prefix)}\u001b[38;5;39m`)
// }
// 
// export function mioloWarn(msg, prefix = 'app') {
//   console.log(`\u001b[0;31m${_msg(msg, prefix)}\u001b[0;39m`)
// }
// 
// export function mioloError(msg, prefix = 'app') {
//   console.log(`\u001b[0;31m${_msg(msg, prefix)}\u001b[0;39m`)
// }

export function mioloLogDebug(msg, prefix = 'app') {
  console.log(gray_light(_msg(msg, prefix)))
}


export function mioloLog(msg, prefix = 'app') {
  console.log(cyan(_msg(msg, prefix)))
}

export function mioloWarn(msg, prefix = 'app') {
  console.log(yellow(_msg(msg, prefix)))
}

export function mioloError(msg, prefix = 'app') {
  console.log(red(_msg(msg, prefix)))
}
