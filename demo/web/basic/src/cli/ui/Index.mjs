import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Page from './layout/Page.mjs'
import Todos from './pages/Todos.mjs'
import { withContext } from '../miolo-cli.mjs'


const Index = ({miolo}) => {
  
  miolo.fetcher.set_auth({
    username: 'todoer',
    password: 'todoer'
  })

  return (

    <Routes> 
      <Route path={'/'} element={<Page/>}>

        <Route index          element={<Todos/>}/>
        <Route path={'todos'} element={<Todos/>}/>
        <Route
            path="*"
            element={<Navigate to="todos" />}
        />
      </Route>
    </Routes>
  )
}

export default withContext(Index)

