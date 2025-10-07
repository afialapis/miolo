/**
 * Transform an JSON object to a query string
 */
const _parse_value= (value) => {
  try {
    return value.replace(/\+/g, '%2B')
  } catch(e) {
    return value
  }
}

export function json_to_query_string(obj) {
  if (obj && (Object.keys(obj).length>0)) {
    const uparams = new URLSearchParams()
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        const value = obj[key];
        if (Array.isArray(value)) {
          value.forEach(item => uparams.append(key, _parse_value(item)))
        } else if (value !== undefined && value !== null) {
          uparams.append(key, _parse_value(value))
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
