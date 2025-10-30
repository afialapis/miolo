import fetch from 'node-fetch'
import { TODOS } from '../data.mjs'

global.fetch = fetch

export const set_auth = (fetcher, auth) => {
  fetcher.set_auth(auth)
}

export const login = async (fetcher, {username, password}) => {
  const res= await fetcher.login('/login', {username, password})
  return res
}

export const logout = async (fetcher)  => {
  const res= await fetcher.logout('/logout')
  return res.data
}


export const make_users_table = async (fetcher) => {
  const res= await fetcher.post('/queries/users/make_table', {})
  return res.data
}


export const make_todos_table = async (fetcher) => {
  const res= await fetcher.post('/queries/todos/make_table', {})
  return res.data
}

export const insert_todos = async (fetcher)  => {
  const ids= []
  for (const todo of TODOS) {
    const res= await fetcher.post('/crud/todos/save', {name: todo})
    const nid= res.data
    ids.push(nid)
  }
  return ids
}

export const insert_todo = async (fetcher, s) => {
  const res= await fetcher.post('/crud/todos/save', {name: s})
  const nid= res.data
  return nid
}

export const insert_fake_todo = async (fetcher)  => {
  const res= await fetcher.post('/queries/todos/fake', {})
  const nid= res.data.id
  return nid
}

export const count_last_hour_todos = async (fetcher)  => {
  const res= await fetcher.get('/queries/todos/last_hour', {h: 2})
  const count= parseInt(res.data)
  return count
}

export const remove_todos = async (fetcher, ids) => {
  let reses = []
  for (const tid of ids) {
    const res= await fetcher.post('/crud/todos/delete', {id: tid})
    reses.push({id: tid, result: res})
  }
  return reses
}

export const clean_todos = async (fetcher) => {
  const res= await fetcher.post('/queries/todos/clean', {})
  const ok= res?.response?.redirected !== true
  return ok
  //return true
}



