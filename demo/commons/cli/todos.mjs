import {do_get, do_post} from './request.mjs'


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

const insert_todos = async (opts) => {
  const ids= []
  for (const todo of TODOS) {
    const res= await do_post('/crud/todos/save', {params: {name: todo}, ...opts||{}})
    const nid= res.data
    ids.push(nid)
  }
  return ids
}

const insert_todo = async (s, opts) => {
  const res= await do_post('/crud/todos/save', {params: {name: s}, ...opts||{}})
  const nid= res.data
  return nid
}

const insert_fake_todo = async (opts) => {
  const res= await do_post('/crud/todos/fake', {params: {}, ...opts||{}})
  const nid= res.data.id
  return nid
}

const count_last_hour_todos = async (opts) => {
  const res= await do_get('/crud/todos/last_hour', {params: {}, ...opts||{}})
  const count= res.data
  return count
}

const remove_todos = async (ids, opts) => {
  for (const tid of ids) {
    const _res= await do_post('/crud/todos/delete', {params: {id: tid}, ...opts||{}})
  }  
}



export {insert_todos, insert_todo, insert_fake_todo, count_last_hour_todos, remove_todos}