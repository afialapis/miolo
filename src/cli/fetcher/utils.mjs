/**
 * Transform an JSON object to a query string
 */
export function json_to_query_string(obj) {
  if (obj && (Object.keys(obj).length>0)) {
    const uparams = new URLSearchParams()
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        const value = obj[key];
        if (Array.isArray(value)) {
          value.forEach(item => uparams.append(key, item))
        } else if (value !== undefined && value !== null) {
          uparams.append(key, value)
        }
      }
    }
    return `?${uparams.toString()}`
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