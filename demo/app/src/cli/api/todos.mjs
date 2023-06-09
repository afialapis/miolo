import fetch from 'node-fetch'
import {miolo} from '../miolo-cli.mjs'

global.fetch = fetch

const TODOS = [
  'Prepare the dough for white bread',
  'Knead and shape the bread rolls',
  'Let the dough rest and ferment',
  'Preheat the oven to the appropriate temperature',
  'Bake the bread for the specified time',
  'Prepare the mixture for the cakes',
  'Fill the cakes with the mixture and seal them properly',
  'Bake the cakes until they are golden',
  'Decorate the cakes with icing or powdered sugar',
  'Prepare the dough for the turnovers',
  'Fill the turnovers with the chosen filling',
  'Close and seal the turnovers',
  'Bake the turnovers until they are flaky and golden brown',
  'Mix and prepare the ingredients for the custard filling',
  'Bake the custard tarts until they are set and lightly browned',
  'Prepare the dough for the cinnamon rolls',
  'Roll and shape the dough into cinnamon rolls',
  'Let the cinnamon rolls rise before baking',
  'Bake the cinnamon rolls until they are fluffy and aromatic',
  'Clean and sanitize the baking equipment and work area',
]

export const demo_app_api = (auth_type) => {

  const {fetcher} = miolo({
    hostname: 'localhost',
    port: 8001,
    auth_type
  })

  console.log(fetcher)

  const set_auth = (auth) => {
    fetcher.set_auth(auth)
  }
  
  const login = async ({username, password}) => {
    return await fetcher.login('/login', {username, password})
  }

  const logout = async () => {
    return await fetcher.logout('/logout')
  }

  const insert_todos = async () => {
    const ids= []
    for (const todo of TODOS) {
      const res= await fetcher.post('/crud/todos/save', {name: todo})
      const nid= res.data
      ids.push(nid)
    }
    return ids
  }

  const insert_todo = async (s) => {
    const res= await fetcher.post('/crud/todos/save', {name: s})
    const nid= res.data
    return nid
  }

  const insert_fake_todo = async () => {
    const res= await fetcher.post('/crud/todos/fake', {})
    const nid= res.data.id
    return nid
  }

  const count_last_hour_todos = async () => {
    const res= await fetcher.get('/crud/todos/last_hour', {})
    const count= res.data
    return count
  }

  const remove_todos = async (ids) => {
    for (const tid of ids) {
      const _res= await fetcher.post('/crud/todos/delete', {id: tid})
    }  
  }

  return {
    set_auth, login, logout, 
    insert_todos, insert_todo, 
    insert_fake_todo, count_last_hour_todos,
    remove_todos
  }
}

