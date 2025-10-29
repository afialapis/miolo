import {omit_nil, trim_left, json_to_query_string, null_to_undefined} from './utils.mjs'

class Fetcher {
  /**
   * @param {*} config {hostname, port, force_hostname, silent_fail: false}
   */
  constructor(config) {
    this.config= config
    this.auth = undefined
  }

  set_auth(auth) {
    if (auth) {
      const {username, password}= auth
      this.auth= {username, password}
    }
  }

  get_headers() {
    let headers = {}

    if (this.auth) {
      let {username, password}= this.auth
      username= username || ''
      password= password || ''

      let sauth
      try {
        sauth= 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
      } catch(_) {
        sauth= 'Basic ' + btoa(username + ":" + password)
      }

      headers['Authorization']= sauth
    }

    return headers
  }

  _prepare_url (url) {
    const endpoint = '/' + trim_left(url, '/')
    
    const {hostname, port, force_hostname} = this.config || {}
    if (hostname && force_hostname) {
      return `http://${hostname}:${port}${endpoint}`
    }
    
    return endpoint
  }

  async _fetch (method, url, params, auth= undefined) {
    this.set_auth(auth)

    let request = {
      method,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        ...this.get_headers() || {}
      }
    }

    let wurl = this._prepare_url(url)
  
    if (method === 'POST') {
      request.body = JSON.stringify(params || {}, (k, v) => v === undefined ? null : v)
    } else if (method === 'GET') {
      if (params) {
        wurl+= json_to_query_string(params)
      }
    }
    
    const response = await fetch(wurl, request)
    
    if (response.redirected) {
      const isBrowser = typeof window == 'object'
      if (isBrowser) {
        // JSDOM does not support navigation,  so lets skip it for tests
        const isTest = typeof navigator !== "undefined" &&
                        navigator.userAgent.includes("Node.js");
        if (!isTest) {
          window.location.replace(response.url)
          return Promise.resolve(response)
        } else {
          console.error(`Response for ${wurl} is a redirect to ${response.url}. But you are in a test environment, where redirects cannot be done. Unexpected results are coming...`)
        }
      }
    }
  
    if (response.headers.get('content-type').indexOf('json') >= 0) {
      let resp= await response.json()
      resp = null_to_undefined(resp)
  
      return {
        ...resp,
        status: response.status,
        response
      }
    }
  
    const data= await response.text()
    return {
      ok: true,
      data,
      status: response.status,
      response
    }

  }
  
  async get(url, params, auth= undefined) {
    /* eslint no-unused-vars:0 */
    try {
      const resp = await this._fetch('GET', url, omit_nil(params), auth)
      return resp
    } catch(e) {
      if (this.config?.silent_fail !== true) {
        console.error(`Error on GET ${url}`)
        console.error(e)
      }

      return {
        ok: false,
        error: e,
        status: -1,
      }
    }
  }

  async post(url, data, auth= undefined) {
    try {
      const resp = await this._fetch('POST', url, data, auth)
      return resp
    } catch(e) {
      if (this.config?.silent_fail !== true) {
        console.error(`Error on POST ${url}`)
        console.error(e)
      }

      return {
        ok: false,
        error: e,
        status: -1
      }
    }
  }  

  async login(url, {username, password}) {
    const res= await this._fetch('POST', url || '/login', {username, password})
    return res
  }

  async logout(url) {
    const res= await this._fetch('POST', url || '/logout', {})
    return res  
  }

  async read(url, params, auth= undefined) {
    return await this.get(`${url}/read`, params, auth)
  }

  async key_list(url, params, auth= undefined) {
    return await this.get(`${url}/key_list`, params, auth)
  }  

  async name_list(url, params, auth= undefined) {
    const resp = await this.key_list(url, params, auth)
    if (resp?.data) {
      resp.data = Object.values(resp.data)
    }
    return resp
  }

  async find(url, id, auth= undefined) {
    return await this.get(`${url}/find`, { id: id }, auth)
  }

  async distinct(url, field, params, auth= undefined) {
    const nparams= {
      ...params,
      distinct_field: field
    }
    return await this.get(`${url}/distinct`, nparams, auth) 
  }

  async upsave(url, data, auth= undefined) {
    let resp
    if (data.id == undefined) {
      delete data.id
      resp= await this.post(`${url}/save`, data, auth)
    } else {
      resp= await this.post(`${url}/update`, data, auth)
    }
    
    return resp
  }  

  async remove(url, id, auth= undefined) {
    const data = { id: id }
    return await this.post(`${url}/delete`, data, auth)
  }
}

Fetcher.keyList= Fetcher.key_list
Fetcher.nameList= Fetcher.name_list

export { Fetcher }

