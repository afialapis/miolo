import React from 'react'
import { Check, Trash2, CircleQuestionMark } from 'lucide-react'
import {Button} from '#cli/components/ui/patched/button.jsx'
import useTodosContext from './context/useTodosContext.mjs'

export default function TodoList() {
  const {todoList, toggleTodo, removeTodo, canEdit, useCrud} = useTodosContext()

  return (

    <div className="space-y-3">
      {todoList.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No todos yet. Add one above!
        </p>
      ) : (
        <ul className="space-y-2">
          {todoList.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => toggleTodo(todo.id)}
                  disabled={!canEdit}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    todo.done
                      ? useCrud  
                        ? 'bg-green-500 hover:border-pink-500 text-white '
                        : 'bg-green-500 hover:border-blue-500 text-white '
                      : useCrud
                        ? 'hover:border-pink-500'
                        : 'hover:border-blue-500'
                  }`}
                  aria-label={todo.done ? 'Mark as not done' : 'Mark as done'}
                >
                  {todo.done ? <Check size={16} /> : <CircleQuestionMark size={16} />}
                </Button>
                <span
                  className={`text-lg ${
                    todo.done
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {todo.description}
                </span>
              </div>
              <Button
                onClick={() => removeTodo(todo.id)}
                disabled={!canEdit}
                className={`p-1.5 rounded-full transition-colors   ${useCrud ? 'text-pink-500 hover:text-pink-400 dark:text-gray-400 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-gray-700' : 'text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'}`}
                aria-label="Delete todo"
              >
                <Trash2 size={18} />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

