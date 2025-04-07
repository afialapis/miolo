import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Page from './layout/Page.mjs'
import Todos from './pages/Todos.mjs'
import { withContext } from '../../../miolo-cli-react.mjs'


const Index = ({fetcher}) => {
  
  fetcher.set_auth({
    username: 'todoer',
    password: 'todoer'
  })

  return (

    <Routes> 
      <Route path={'/'} element={<Page/>}>

        <Route index      element={<Todos/>}/>
        <Route path={'*'} element={<Todos/>}/>
      </Route>
    </Routes>
  )
}

export default withContext(Index)

