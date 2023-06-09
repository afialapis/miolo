import {init_fetcher_guest} from './guest.mjs'
import {init_fetcher_basic} from './basic.mjs'
import {init_fetcher_passport} from './passport.mjs'


export function init_fetcher({hostname, port, auth_type}) {
  if (auth_type==='passport') {
    return init_fetcher_passport({hostname, port})
  }
  if (auth_type==='basic') {
    return init_fetcher_basic({hostname, port})
  }
  if (auth_type==='guest') {
    return init_fetcher_guest({hostname, port})
  }
  return init_fetcher_passport({hostname, port})
}