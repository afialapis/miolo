import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {withContext} from 'miolo-hooks'

import Page from 'cli/ui/layout/Page'
import Todos from 'cli/ui/pages/Todos'
import Login from 'cli/ui/pages/Login'
import Logout from 'cli/ui/pages/Logout'

const Index = ({context}) => {

  console.log('miolo-demo UI Index ')
  console.log(context)
  
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

