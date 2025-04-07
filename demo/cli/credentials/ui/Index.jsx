import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { withContext } from '../../../miolo-cli-react.mjs'
import Page from './layout/Page.jsx'
import Todos from './pages/Todos.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'


const Index = ({authenticated/*, socket*/}) => {

  // console.log('miolo-demo UI Index ')
  // console.log({user, authenticated})

  // if (socket) {
  //   socket.emit('test', 'Test Message')
  // }
  
  return (

    <Routes> 
      <Route path={'/'} element={<Page/>}>

        <Route index      element={<Todos/>}/>
        

        { authenticated
          ? <Route path={'logout'} element={<Logout/>}/>
          : <Route path={'login'} element={<Login/>}/>
        }

        <Route path={'*'} element={<Todos/>}/>
      </Route>
    </Routes>
  )
}

export default withContext(Index)

