

import {make_request} from '../request'
import {omit_nil} from './utils'


const _FetcherRequester = {
  get(url, params) {
    return make_request('GET', url, omit_nil(params))
  },

  post(url, data, isMultiForm = false) {
    return make_request('POST', url, data, isMultiForm)
  }
}



class Fetcher {

  constructor() {
    this.request = _FetcherRequester
  }

  log_error = (msg, e) => {
    console.error(msg)
    console.error(e)
  }

  async get(url, params = {}, options= {}) {
    /* eslint no-unused-vars:0 */
    try {
      const resp = await this.request.get(url, params)
      return resp
    } catch(e) {
      this.log_error(`Error on GET ${url}`, e)  
      return {
        data: undefined,
        status: -1
      }
    }
  }

  async post(url, params = {}, options= {}) {
    try {
      const resp = await this.request.post(url, params)
      return resp
    } catch(e) {
      this.log_error(`Error on POST ${url}`, e)  
      return {
        data: undefined,
        status: -1
      }
    }
  }  

  async read(url, params = {}, options= {}) {
    const result = await this.get(`${url}/read`, params, options)
    return result.data
  }

  async key_list(url, params, options= {}) {
    const result = await this.get(`${url}/key_list`, params, options)
    return result.data
  }  

  async name_list(url, params, options= {}) {
    const result = await this.key_list(url, params, options)
    return Object.values(result)
  }

  async find(url, id, options= {}) {
    const result = await this.get(`${url}/find`, { id: id }, options)
    return result.data
  }

  async distinct(url, field, params = {}, options= {}) {
    const nparams= {
      ...params,
      distinct_field: field
    }
    const result = await this.get(`${url}/distinct`, nparams, options)
    return result.data   
  }

  async upsave(url, params, options= {}) {
    let result
    if (params.id == undefined) {
      delete params.id
      result= await this.post(`${url}/save`, params, options)
    } else {
      result= await this.post(`${url}/update`, params, options)
    }
    
    return result.data
  }  

  async remove(url, id, options= {}) {
    const params = { id: id }
    const result = await this.post(`${url}/delete`, params, options)
    return result.data
  }
}

Fetcher.keyList= Fetcher.key_list
Fetcher.nameList= Fetcher.name_list

export { Fetcher }
