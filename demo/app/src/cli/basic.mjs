import {insert_todos, insert_fake_todo, remove_todos} from '../../../commons/cli/todos.mjs'


const AUTH= {
  username: 'todoer',
  password: 'todoer'
}

const miolo_demo_app_client_basic_auth = async () => {
  const tids= await insert_todos({auth: AUTH})
  await remove_todos(tids, {auth: AUTH})
  const tid = await insert_fake_todo({auth: AUTH})
  await remove_todos([tid], {auth: AUTH})
}


export {miolo_demo_app_client_basic_auth}