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

export function make_endpoint_from_fn(fn, field) {

  async function endpoint_from_fn(ctx) {
    ctx.miolo.logger.info(`[router] ${fn.name}()`)
    
    const params = ctx.request.fields
    try {
      ctx.miolo.logger.debug(`[router] ${fn.name}() Calling with params ${JSON.stringify(params)}`)
    } catch (_) {}

    const result = await fn(ctx.miolo, params)

    try {
      ctx.miolo.logger.debug(`[router] ${fn.name}() Called with result ${JSON.stringify(result)}`)
    } catch (_) {}

    ctx.body = result
  }
  
  Object.defineProperty(endpoint_from_fn, 'name', {value: fn.name, writable: false})

  return endpoint_from_fn
}
