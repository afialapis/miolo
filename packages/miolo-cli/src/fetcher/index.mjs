import { Fetcher } from "./fetcher.mjs"

export function init_fetcher(config, socket = undefined) {
  const fetcher = new Fetcher(config, socket)
  return fetcher
}
