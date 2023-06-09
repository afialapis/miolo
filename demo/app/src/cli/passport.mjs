import {demo_app_api} from './api/todos.mjs'


const AUTH= {
  username: 'todoer',
  password: 'todoer'
}

const miolo_demo_app_client_passport = async () => {

  const {login, logout, insert_todos, 
    insert_fake_todo, 
    count_last_hour_todos, 
    remove_todos} = demo_app_api('passport')

  await login(AUTH)

  const tids= await insert_todos()

  const count= await count_last_hour_todos() 
  console.log('·································································')
  console.log(`Inserted ${count} todos!`)
  console.log('·································································')

  await remove_todos(tids)
  const tid = await insert_fake_todo()
  await remove_todos([tid])

  await logout()

  
}

export {miolo_demo_app_client_passport}