import React from 'react'
import TodoList from './TodoList.jsx'
import TodoAdd from './TodoAdd.jsx'
import TodoActions from './TodoActions.jsx'

export default function TodosList() {
  return (
    <div className="flex flex-row gap-4 p-4">
      
      <div className="p-4 flex-1">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          My Todo List
        </h1>

        {/* Add Todo Form */}
        <TodoAdd/>

        {/* Todo List */}
        <TodoList/>
      </div>

      <TodoActions/>
    </div>
  )
}


