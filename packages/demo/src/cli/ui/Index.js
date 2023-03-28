import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {withContext} from 'miolo-cli-tools'

import Page from './layout/Page'
import Todos from './pages/Todos'
import Login from './pages/Login'
import Logout from './pages/Logout'


const Index = ({context}) => {

  // console.log('miolo-demo UI Index ')
  // console.log(context)
  
  return (

    <Routes> 
      <Route path={'/'} element={<Page/>}>

        <Route index          element={<Todos/>}/>
        <Route path={'todos'} element={<Todos/>}/>

        { context.authenticated
          ? <Route path={'logout'} element={<Logout/>}/>
          : <Route path={'login'} element={<Login/>}/>
        }

        <Route
            path="*"
            element={<Navigate to="todos" />}
        />
      </Route>
    </Routes>
  )
}

export default withContext(Index)

