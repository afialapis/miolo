import {omit_nil, trim_left, json_to_query_string} from './utils.mjs'

class Fetcher {
  /**
   * @param {*} config {hostname, port}
   */
  constructor(config) {
    this.config= config
  }

  get_headers() {
    return {}
  }

  _prepare_url (url) {
    const endpoint = '/' + trim_left(url, '/')

    const {hostname, port} = this.config || {}
    if (hostname) {
      return `http://${hostname}:${port}${endpoint}`
    }
    return endpoint
  }

  async _fetch (method, url, params) {

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
  
  async get(url, params) {
    /* eslint no-unused-vars:0 */
    try {
      const resp = await this._fetch('GET', url, omit_nil(params))
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

  async post(url, data) {
    try {
      const resp = await this._fetch('POST', url, data, false)
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

  async read(url, params) {
    const result = await this.get(`${url}/read`, params)
    return result.data
  }

  async key_list(url, params) {
    const result = await this.get(`${url}/key_list`, params)
    return result.data
  }  

  async name_list(url, params) {
    const result = await this.key_list(url, params)
    return Object.values(result)
  }

  async find(url, id) {
    const result = await this.get(`${url}/find`, { id: id })
    return result.data
  }

  async distinct(url, field, params) {
    const nparams= {
      ...params,
      distinct_field: field
    }
    const result = await this.get(`${url}/distinct`, nparams)
    return result.data   
  }

  async upsave(url, data) {
    let result
    if (data.id == undefined) {
      delete data.id
      result= await this.post(`${url}/save`, data)
    } else {
      result= await this.post(`${url}/update`, data)
    }
    
    return result.data
  }  

  async remove(url, id) {
    const data = { id: id }
    const result = await this.post(`${url}/delete`, data)
    return result.data
  }
}

Fetcher.keyList= Fetcher.key_list
Fetcher.nameList= Fetcher.name_list

export { Fetcher }

