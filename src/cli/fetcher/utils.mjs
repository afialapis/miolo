import stringify from "qs/lib/stringify.js"

/**
 * Transform an JSON object to a query string
 */
export function json_to_query_string(params) {
  if (params && (Object.keys(params).length>0)) {
    return `?${stringify(params)}`
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


export function parse_login_cookie(response) {
  if (typeof window !== 'object') {
    return undefined
  }
  try {
    const raw = response.headers.raw()['set-cookie'];
    return raw.map((entry) => {
      const parts = entry.split(';');
      const cookiePart = parts[0];
      return cookiePart;
    }).join(';');
  } catch(e) {
    console.log('[miolo-cli] Could not get the set-cookie after login')
    return undefined
  }
}