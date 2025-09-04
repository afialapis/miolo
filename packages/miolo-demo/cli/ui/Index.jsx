import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { withMioloContext } from 'miolo-react'
import Page from '#cli/ui/layout/Page.jsx'
import Todos from '#cli/ui/pages/Todos.jsx'
import Login from '#cli/ui/pages/Login.jsx'
import { ThemeProvider } from "#cli/components/ui/theme-provider.jsx"

const Index = ({authenticated/*, socket*/}) => {

  // console.log('miolo-demo UI Index ')
  // console.log({user, authenticated})

  // if (socket) {
  //   socket.emit('test', 'Test Message')
  // }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes> 
        { (!authenticated)
          ? 
            <Route path={'/'} element={<Login/>}/>
          :
            <Route path={'/'} element={<Page/>}>
              <Route index      element={<Todos/>}/>
              <Route path={'*'} element={<Todos/>}/>
            </Route>
        }
      </Routes>
    </ThemeProvider>
  )
}

export default withMioloContext(Index)
