import { Fetcher } from "./base.mjs"

class FetcherBasic extends Fetcher {
  constructor(config) {
    super(config)
    this.auth = undefined
  }
  
  set_auth(auth) {
    if (auth) {
      const {username, password}= auth
      this.auth= {username, password}
    }
  }

  get_headers() {
    if (! this.auth) {
      return {}
    }

    let {username, password}= this.auth
    username= username || ''
    password= password || ''

    let sauth
    try {
      sauth= 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
    } catch(_) {
      sauth= 'Basic ' + btoa(username + ":" + password)
    }

    return {
      'Authorization': sauth
    }
  }

  async get(url, params, auth= undefined) {
    this.set_auth(auth)
    return await super.get(url, params)
  }

  async post(url, data, auth= undefined) {
    this.set_auth(auth)
    return await super.post(url, data)
  }  

  async read(url, params, auth= undefined) {
    console.log('BASIC FETCHER read')
    this.set_auth(auth)
    return await super.read(url, params)
  }

  async key_list(url, params, auth= undefined) {
    this.set_auth(auth)
    return await super.key_list(url, params)
  }  

  async name_list(url, params, auth= undefined) {
    this.set_auth(auth)
    return await super.name_list(url, params)
  }

  async find(url, id, auth= undefined) {
    this.set_auth(auth)
    return await super.find(url, id)
  }

  async distinct(url, field, params, auth= undefined) {
    this.set_auth(auth)
    return await super.distinct(url, field, params)
  }

  async upsave(url, data, auth= undefined) {
    this.set_auth(auth)
    return await super.upsave(url, data)
  }  

  async remove(url, id, auth= undefined) {
    this.set_auth(auth)
    return await super.remove(url, id)
  }
}

export function init_fetcher_basic(config) {
  const fetcher= new FetcherBasic(config)
  return fetcher
}
