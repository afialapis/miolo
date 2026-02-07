import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import {Button} from '#cli/components/ui/patched/button.jsx'
import useTodosContext from './context/useTodosContext.mjs'

export default function TodoAdd() {
  const {addTodo, canEdit, useCrud} = useTodosContext()


  const [inputText, setInputText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      addTodo(inputText);
      setInputText('');
    }
  }

  return (

    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={canEdit ? "Things to be done..." : "LogIn in order to be able to add todos :/"}
          disabled={!canEdit}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
        <Button
          type="submit"
          disabled={!canEdit}
          className={`px-4 py-6  text-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${useCrud ? 'bg-pink-500 hover:bg-pink-400' : 'bg-blue-500 hover:bg-blue-400'}`}
        >
          <Plus size={18} />
          Add
        </Button>
      </div>
      
    </form>

  )
}


