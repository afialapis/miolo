import React, {useState, useEffect} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Todos from 'cli/ui/pages/Todos'
import Login from 'cli/ui/pages/Login'
import Logout from 'cli/ui/pages/Logout'
import {Context} from 'miolo-hooks'
import Page from 'cli/ui/layout/Page'

const Index = ({state}) => {
  const [innerState, setInnerState]= useState(state || {})
  
  useEffect(() => {
    setInnerState(state)
  }, [state])

  return (
    <Context.Provider value={{state: innerState, setState: setInnerState}}>

      <Routes> 
        <Route path={'/'} element={<Page/>}>

          <Route index          element={<Todos/>}/>
          <Route path={'todos'} element={<Todos/>}/>

          { state.authenticated
            ? <Route path={'logout'} element={<Logout/>}/>
            : <Route path={'login'} element={<Login/>}/>
          }

          <Route
              path="*"
              element={<Navigate to="todos" />}
          />
        </Route>
      </Routes>
    </Context.Provider>
  )
}

export default Index

