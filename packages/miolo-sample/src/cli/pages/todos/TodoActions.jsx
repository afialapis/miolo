import React, { useState } from 'react'
import {Bone, CircleQuestionMark, Bomb, RefreshCw } from 'lucide-react';
import {Button} from '#cli/components/ui/patched/button.jsx'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "#cli/components/ui/field.jsx"
import { Switch } from "#cli/components/ui/switch.jsx"


import useTodosContext from './context/useTodosContext.mjs'

const throwAnError = () => { 
  const obj= {}
  const _foo = obj.foo.bar
}

export default function TodoActions() {
const {refreshTodoList, checkLastHours, insertFakeTodo, canEdit, useCrud, setUseCrud} = useTodosContext()
  const [hours, setHours] = useState(1)


  return (

    <div className="flex flex-col gap-4 p-4">

      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Actions
      </h1>

      <div className="flex flex-col gap-2 mt-4">
        <Button
          onClick={refreshTodoList}
          className={`px-4 py-6  text-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${useCrud ? 'bg-pink-500 hover:bg-pink-400' : 'bg-blue-500 hover:bg-blue-400'}`}
        >
          <RefreshCw size={18} />
          Refresh
        </Button>
        <Button
          onClick={() => insertFakeTodo()}
          disabled={!canEdit}
          className={`px-4 py-6  text-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${useCrud ? 'bg-pink-500 hover:bg-pink-400' : 'bg-blue-500 hover:bg-blue-400'}`}
        >
          <Bone size={18} />
          Insert fake
        </Button>

        <Button
          onClick={() => checkLastHours({hours})}
          className="px-4 py-6 bg-pink-500 text-white rounded-lg hover:bg-pink-400 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <CircleQuestionMark size={18} />
          {`How many todos I have added in the last ${hours} hours?`}  
        </Button>   
        <Button
          onClick={() => throwAnError()}
          className="px-4 py-6 bg-pink-500 text-white rounded-lg hover:bg-pink-400 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Bomb size={18} />
          {`Throw an JS error`}  
        </Button>          
      </div>   

      <h1 className="text-3xl font-bold text-center mt-8 mb-8 text-gray-800 dark:text-white">
        Options
      </h1>

      <div className="flex flex-col gap-2 mt-4">
        <Field orientation="horizontal" className="max-w-sm">
          <FieldContent>
            <FieldLabel htmlFor="switch-focus-mode">
              Use <span className="font-bold text-pink-500">CRUD</span>
            </FieldLabel>
            <div className="text-sm text-muted-foreground">
              <div>
                <span className="font-bold text-pink-500">CRUD</span> are the routes exposed by <b>miolo</b> directly from database: <i>one table, one route</i>.
              </div>
              <div>
                <span className="font-bold text-blue-500">API</span> are the routes exposed by the developer.
              </div>
              <div>
                Some actions have the two ways: just pick one of them.
              </div>

            </div>
          </FieldContent>
          <Switch id="switch-focus-mode" checked={useCrud} onCheckedChange={setUseCrud}/>
        </Field>
      </div>           
    </div>
  )
}