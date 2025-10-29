/**
 * Transform a query string to a JSON object
 */
import qs from 'qs'

export function query_string_to_json(url) {     
  let search= url.indexOf('?')>=0 ? url.substr(url.indexOf('?')+1) : '';
  if (search) {
    return qs.parse(search)
  }
  return {}
}

export function make_endpoint_from_fn(fn) {

  async function endpoint_from_fn(ctx) {    
    const params = ctx.request.body
    try {
      ctx.miolo.logger.silly(`[router] ${fn.name}() Calling with params ${JSON.stringify(params)}`)
    } catch (_) {
      ctx.miolo.logger.silly(`[router] ${fn.name}() Calling with params (?)`)
    }

    let response = {ok: false}
    try {
      const result = await fn(ctx.miolo, params)
      response = ensure_response_is_ok_data(ctx, result)
    } catch(error) {
      ctx.miolo.logger.debug(`[router] ${fn.name}()Unexpected error. ${error?.message || error}`)
      response= {
        ok: false,
        error: error?.message || error
      }
    }

    try {
      ctx.miolo.logger.silly(`[router] ${fn.name}() Responding with body ${JSON.stringify(response)}`)
    } catch (_) {
      ctx.miolo.logger.silly(`[router] ${fn.name}() Responding with body (?)`)
    }

    ctx.body = response
  }
  
  Object.defineProperty(endpoint_from_fn, 'name', {value: fn.name, writable: false})

  return endpoint_from_fn
}


export function ensure_response_is_ok_data(ctx, response) {
  if ((response?.ok === undefined) && (response?.data === undefined) && (response?.error === undefined)) {
    ctx.miolo.logger.debug(`[router] Response without ok/[data/error] fields. Fields are: ${Object.keys(response)}. Let's wrap it on an ok response`)
    return {
      ok: true,
      data: response
    }
  }
  if (response?.error !== undefined) {
    return {
      ok: false,
      error: response.error,
      data: response?.data
    }
  }
  
  return {
    ok: response?.ok !== false,
    data: response?.data,
    error: response?.error
  }
}