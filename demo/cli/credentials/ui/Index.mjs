import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { withContext } from '../../../miolo-cli-react.mjs'
import Page from './layout/Page.mjs'
import Todos from './pages/Todos.mjs'
import Login from './pages/Login.mjs'
import Logout from './pages/Logout.mjs'


const Index = ({authenticated/*, socket*/}) => {

  // console.log('miolo-demo UI Index ')
  // console.log({user, authenticated})

  // if (socket) {
  //   socket.emit('test', 'Test Message')
  // }
  
  return (

    <Routes> 
      <Route path={'/'} element={<Page/>}>

        <Route index          element={<Todos/>}/>
        <Route path={'todos'} element={<Todos/>}/>

        { authenticated
          ? <Route path={'logout'} element={<Logout/>}/>
          : <Route path={'login'} element={<Login/>}/>
        }

        <Route
            path="*"
            element={<Navigate to="../todos" />}
        />
      </Route>
    </Routes>
  )
}

export default withContext(Index)

