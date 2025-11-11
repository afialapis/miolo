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

export function ensure_response_is_ok_data(ctx, response) {
  if ((response?.ok === undefined) && (response?.data === undefined) && (response?.error === undefined)) {
    ctx.miolo.logger.debug(`[router] Response without ok/[data/error] fields. It is: ${JSON.stringify(response)}. Let's wrap it on an ok response`)
    return {
      ok: true,
      data: response || {}
    }
  }
  if (response?.error !== undefined) {
    return {
      ok: false,
      error: response.error,
      data: response?.data
    }
  }
  
  const ok = response?.ok !== false
  const data = response?.data || response || {}
  return {ok, data}
}