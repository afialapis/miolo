import React, {useCallback, useEffect} from 'react'
import {withContext, useFetcher} from 'miolo-hooks'
import TodosList from './TodosList'
import { assertSsrData, useSsrData} from 'cli/ssr'


function show_title  (title) {
  if (document!=undefined) {
      document.title= title
  }
}

const Todos = ({context}) => {
  const fetcher = useFetcher()
  const [todoList, setTodoList] = useSsrData(context, 'todoList', [])
  
  const refreshTodos = useCallback(() => {
    async function fetchData() {
      show_title('loading todos...')
      const nTodoList = await fetcher.read('crud/todos')
      
      setTodoList(nTodoList)

      show_title('todos loaded!')
    }

    fetchData()
       
    
  }, [fetcher, setTodoList]) 

  
  useEffect(() => {
    try {
      if (! assertSsrData('todoList')) {
        refreshTodos()
      }
    } catch(e) {}
  }, [refreshTodos]) 
  

  const addTodo = useCallback((text) => {

    async function addIt() {

      const todoObject = {
        id: undefined,
        name: text,
        done: false,
      }

      const todoId= await fetcher.upsave('crud/todos', todoObject)
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
    alert(res)
  }, [fetcher])

  const insertFakeTodo = useCallback(async () => {
    const _tid= await fetcher.post('crud/todos/fake')
    refreshTodos()
  }, [fetcher, refreshTodos])

  return (
    <TodosList
      authenticated  = {context.authenticated}
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


