/**
 * Transform a query string to a JSON object
 */
import qs from 'qs'

export function query_string_to_json(url) {
  const search = url.includes('?') ? url.substring(url.indexOf('?') + 1) : ''
  if (!search) return {}

  const parsed = qs.parse(search)
  //
  function reviveTypes(value) {
    if (Array.isArray(value)) return value.map(reviveTypes)
    if (value && typeof value === 'object') {
      const result = {}
      for (const key in value) {
        if (Object.hasOwn(value, key)) result[key] = reviveTypes(value[key])
      }
      return result
    }
    // Try to convert to boolean, number o null
    if (value === 'true') return true
    if (value === 'false') return false
    if (value === 'null') return null
    if (!isNaN(value) && value !== '') return Number(value)
    return value
  }

  return reviveTypes(parsed)
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
  const data = (response?.data!==undefined) 
    ? response.data
    : (response!==undefined)
    ? response
    : {}
  return {ok, data}
}