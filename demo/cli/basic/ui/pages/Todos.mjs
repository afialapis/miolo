import React, {useCallback} from 'react'
import {withContext} from '../../../../miolo-cli-react.mjs'
import TodosList from './TodosList.mjs'

function _showTitle  (title) {
  if (document!=undefined) {
      document.title= title
  }
}

async function _todoListLoader(context, {fetcher}) {
  _showTitle('loading todos...')
  const nTodoList = await fetcher.read('crud/todos')     
  _showTitle('todos loaded!')
  return nTodoList
}

const Todos = ({useSsrData, fetcher}) => {
  const [todoList, setTodoList, refreshTodoList] = useSsrData('todoList', [], _todoListLoader)

  const addTodo = useCallback((text) => {

    async function addIt() {

      const todoObject = {
        id: undefined,
        name: text,
        done: false,
      }

      const todoId= await fetcher.upsave('crud/todos', todoObject, {
        username: 'todoer',
        password: 'todoer'
      })
      todoObject.id= todoId

      setTodoList([todoObject, ...todoList])
    }

    addIt()

  }, [fetcher, todoList, setTodoList])


  const toggleTodo = useCallback((todoId) => {

    async function toggleIt() {

      const nTodoList= [...todoList]
      const selectedTodoIndex = nTodoList.findIndex((item) => item.id == todoId)
      nTodoList[selectedTodoIndex].done = !nTodoList[selectedTodoIndex].done
  
      setTodoList(nTodoList)

      const _res= await fetcher.upsave('crud/todos', nTodoList[selectedTodoIndex])
    }

    toggleIt()

  }, [fetcher, todoList, setTodoList])

  const removeTodo = useCallback((todoId) => {
    const nTodoList= [...todoList]
    nTodoList.splice(
      nTodoList.findIndex((item) => item.id == todoId),
      1
    )

    setTodoList(nTodoList)

    fetcher.remove('crud/todos', todoId)
  }, [fetcher, todoList, setTodoList])

  
  const checkLastHour = useCallback(async () => {
    const res= await fetcher.get('crud/todos/last_hour')
    alert(`You have added ${res.data} todos in the last hour`)
  }, [fetcher])

  const insertFakeTodo = useCallback(async () => {
    const _tid= await fetcher.post('crud/todos/fake')
    refreshTodoList()
  }, [fetcher, refreshTodoList])

  return (
    <TodosList
      todoList       = {todoList}
      addTodo        = {addTodo}
      toggleTodo     = {toggleTodo}
      removeTodo     = {removeTodo}
      checkLastHour  = {checkLastHour}
      insertFakeTodo = {insertFakeTodo}
    />
  )
}

export default withContext(Todos)


