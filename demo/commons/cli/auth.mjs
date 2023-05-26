import {do_post} from './request.mjs'

function parseCookies(response) {
  const raw = response.headers.raw()['set-cookie'];
  return raw.map((entry) => {
    const parts = entry.split(';');
    const cookiePart = parts[0];
    return cookiePart;
  }).join(';');
}

const login = async ({username, password}) => {
  const res= await do_post('/login', {params: {username, password}})
  const cookie= parseCookies(res.response)
  return cookie
}

const logout = async ({cookie}) => {
  const res= await do_post('/logout', {params: {}, cookie})
  return res.data
}



export {login, logout}