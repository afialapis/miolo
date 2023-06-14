import qs from "qs"

/**
 * Transform an JSON object to a query string
 */
export function json_to_query_string(params) {
  if (params && (Object.keys(params).length>0)) {
    return `?${qs.stringify(params)}`
  }
  return ''
}

export function trim_left(str, what) {
  return str.replace(new RegExp(`^${what || '\\s'}+`), '')
}


export function omit_nil(obj) {
  if (typeof obj !== 'object') return obj
  return Object.keys(obj).reduce((acc, v) => {
    if (obj[v] !== undefined) acc[v] = obj[v]
    return acc
  }, {})
}


