import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Page from './layout/Page.mjs'
import Todos from './pages/Todos.mjs'


const Index = () => {


  return (

    <Routes> 
      <Route path={'/'} element={<Page/>}>

        <Route index          element={<Todos/>}/>
        <Route path={'todos'} element={<Todos/>}/>
        <Route
            path="*"
            element={<Navigate to="../todos" />}
        />
      </Route>
    </Routes>
  )
}

export default Index

