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
