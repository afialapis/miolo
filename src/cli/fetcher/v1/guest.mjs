import { Fetcher } from "./base.mjs"

class FetcherGuest extends Fetcher {
  get_headers() {
    return {}
  }
}

export function init_fetcher_guest(config) {
  const fetcher= new FetcherGuest(config)
  return fetcher
}