import fetch from 'node-fetch'

const _do_request = async (method, url, {params, auth, cookie}) => {

  let request = {
    method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    }
  }
  if (cookie) {
    //request['cookie']= cookie
    request.headers['Cookie']= cookie
  }

  if (auth!=undefined) {
    request.headers['Authorization']= 'Basic ' + Buffer.from(auth.username + ":" + auth.password).toString('base64')
  }

  if (method === 'POST') {
    request.body = JSON.stringify(params || {}, (k, v) => v === undefined ? null : v)
  }
  
  const response = await fetch(`http://localhost:${8001}${url}`, request)
  
  if (response.redirected) {
    return Promise.resolve(response)
  }

  if (response.headers.get('content-type').indexOf('json') >= 0) {
    const data= await response.json()

    return {
      data,
      status: response.status,
      response
    }
  }

  const data= await response.text()
  return {
    data,
    status: response.status,
    response
  }
}

const do_get = async (url, {auth, cookie}) => {
  return await _do_request('GET', url, {auth, cookie})
}

const do_post = async (url, {params, auth, cookie}) => {
  return await _do_request('POST', url, {params, auth, cookie})
}

export {do_get, do_post}
