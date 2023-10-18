import {omit_nil, trim_left, json_to_query_string, parse_login_cookie} from './utils.mjs'

class Fetcher {
  /**
   * @param {*} config {hostname, port}
   */
  constructor(config) {
    this.config= config
    this.auth = undefined
    this.cookie = undefined
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

    if (this.cookie) {
      headers['Cookie']= this.cookie
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
      if (typeof window == 'object') {
        window.location.replace(response.url)
      }      
      return Promise.resolve(response)
    }
  
    if (response.headers.get('content-type').indexOf('json') >= 0) {
      const data= await response.json()
  
      return {
        data,
        status: response.status,
        response
      }
    }
  
    const data= await response.text()
    return {
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
      console.error(`Error on GET ${url}`)
      console.error(e)

      return {
        data: undefined,
        status: -1
      }
    }
  }

  async post(url, data, auth= undefined) {
    try {
      const resp = await this._fetch('POST', url, data, auth)
      return resp
    } catch(e) {
      console.error(`Error on POST ${url}`)
      console.error(e)  
      return {
        data: undefined,
        status: -1
      }
    }
  }  

  async login(url, {username, password}) {
    const res= await this._fetch('POST', url || '/login', {username, password})
    this.cookie= parse_login_cookie(res.response)
    return res
  }

  async logout(url) {
    this.cookie= undefined
    const res= await this._fetch('POST', url || '/logout', {})
    return res  
  }

  async read(url, params, auth= undefined) {
    const result = await this.get(`${url}/read`, params, auth)
    return result.data
  }

  async key_list(url, params, auth= undefined) {
    const result = await this.get(`${url}/key_list`, params, auth)
    return result.data
  }  

  async name_list(url, params, auth= undefined) {
    const result = await this.key_list(url, params, auth)
    return Object.values(result)
  }

  async find(url, id, auth= undefined) {
    const result = await this.get(`${url}/find`, { id: id }, auth)
    return result.data
  }

  async distinct(url, field, params, auth= undefined) {
    const nparams= {
      ...params,
      distinct_field: field
    }
    const result = await this.get(`${url}/distinct`, nparams, auth)
    return result.data   
  }

  async upsave(url, data, auth= undefined) {
    let result
    if (data.id == undefined) {
      delete data.id
      result= await this.post(`${url}/save`, data, auth)
    } else {
      result= await this.post(`${url}/update`, data, auth)
    }
    
    return result.data
  }  

  async remove(url, id, auth= undefined) {
    const data = { id: id }
    const result = await this.post(`${url}/delete`, data, auth)
    return result.data
  }
}

Fetcher.keyList= Fetcher.key_list
Fetcher.nameList= Fetcher.name_list

export { Fetcher }

