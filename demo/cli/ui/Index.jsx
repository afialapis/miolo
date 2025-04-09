import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { withMioloContext } from 'miolo/cli-react'
import Page from './layout/Page.jsx'
import Todos from './pages/Todos.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'
import useAuthType from './useAuthType.mjs'


const Index = ({authenticated/*, socket*/}) => {
  const authType = useAuthType()

  // console.log('miolo-demo UI Index ')
  // console.log({user, authenticated})

  // if (socket) {
  //   socket.emit('test', 'Test Message')
  // }
  
  return (

    <Routes> 
      <Route path={'/'} element={<Page/>}>

        <Route index      element={<Todos/>}/>
        
        { (authType==='guest')
          ? null
          : authenticated
          ? <Route path={'logout'} element={<Logout/>}/>
          : <Route path={'login'} element={<Login/>}/>
        }

        <Route path={'*'} element={<Todos/>}/>
      </Route>
    </Routes>
  )
}

export default withMioloContext(Index)
