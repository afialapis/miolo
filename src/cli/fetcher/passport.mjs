import { Fetcher } from "./base.mjs"

function _parseCookies(response) {
  if (typeof window == 'object') {
    return undefined
  }
  try {
    const raw = response.headers.raw()['set-cookie'];
    return raw.map((entry) => {
      const parts = entry.split(';');
      const cookiePart = parts[0];
      return cookiePart;
    }).join(';');
  } catch(e) {
    console.log('[miolo] Could not get the set-cookie after login')
    return undefined
  }
}

class FetcherPassport extends Fetcher {
  constructor(config) {
    super(config)
    this.cookie = undefined
  }
  
  get_headers() {
    return {
      'Cookie': this.cookie
    }
  }

  async login(url, {username, password}) {
    const res= await this._fetch('POST', url || '/login', {username, password})
    this.cookie= _parseCookies(res.response)
    return res
  }

  async logout(url) {
    const res= await this._fetch('POST', url || '/logout', {})
    this.cookie= undefined
    return res  
  }
}

export function init_fetcher_passport(config) {
  const fetcher= new FetcherPassport(config)
  return fetcher
}

