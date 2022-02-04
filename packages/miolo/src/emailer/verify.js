import {make_emailer} from './index'

function veryfy_emailer(config) {
  const emailer= make_emailer(config)
  return emailer.verify()
}

export {veryfy_emailer}