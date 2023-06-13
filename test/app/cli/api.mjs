import fetch from 'node-fetch'
import { TODOS } from '../data.mjs'

global.fetch = fetch

const set_auth = (fetcher, auth) => {
  fetcher.set_auth(auth)
}

const login = async (fetcher, {username, password}) => {
  const res= await fetcher.login('/login', {username, password})
  return res.data
}

const logout = async (fetcher)  => {
  const res= await fetcher.logout('/logout')
  return res.data
}

const insert_todos = async (fetcher)  => {
  const ids= []
  for (const todo of TODOS) {
    const res= await fetcher.post('/crud/todos/save', {name: todo})
    const nid= res.data
    ids.push(nid)
  }
  return ids
}

const insert_todo = async (fetcher, s) => {
  const res= await fetcher.post('/crud/todos/save', {name: s})
  const nid= res.data
  return nid
}

const insert_fake_todo = async (fetcher)  => {
  const res= await fetcher.post('/crud/todos/fake', {})
  const nid= res.data.id
  return nid
}

const count_last_hour_todos = async (fetcher)  => {
  const res= await fetcher.get('/crud/todos/last_hour', {})
  const count= parseInt(res.data)
  return count
}

const remove_todos = async (fetcher, ids) => {
  let reses = []
  for (const tid of ids) {
    const res= await fetcher.post('/crud/todos/delete', {id: tid})
    reses.push({id: tid, result: res})
  }  
  return reses
}

const clean_todos = async (fetcher) => {
  const res= await fetcher.get('/crud/todos/clean', {})
  const count= parseInt(res.data)
  return count
}




export {
  set_auth, login, logout, 
  insert_todos, insert_todo, 
  insert_fake_todo, count_last_hour_todos,
  remove_todos, clean_todos
}

