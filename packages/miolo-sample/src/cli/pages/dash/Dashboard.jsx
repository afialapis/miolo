import React from 'react'
import useBreads from '#cli/context/data/useBreads.mjs'

import TodosProvider from '../todos/context/TodosProvider.jsx'
import Todos from '../todos/Todos'

export default function Dashboard() {

  useBreads(() => {
    return [ ['Inicio'] ]
  }, [])
  
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <TodosProvider>
        <Todos />
      </TodosProvider>
      {/*
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl">
          
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
      </div>
      */}
    </div>
  )
}

