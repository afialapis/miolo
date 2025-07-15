import {Fetcher} from './fetcher.mjs'


export function init_fetcher(config) {
  const fetcher= new Fetcher(config)
  return fetcher
}
