/**
 * Transform a query string to a JSON object
 */
export function query_string_to_json(url) {     
  let search= url.indexOf('?')>=0 ? url.substr(url.indexOf('?')) : '';
  if (search && search!='?') {
    let pairs = search.slice(1).split('&');
    
    let result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });
    return JSON.parse(JSON.stringify(result))
  }
  return {}
}
