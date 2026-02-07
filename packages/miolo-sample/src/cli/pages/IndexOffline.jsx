import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from '#cli/pages/offline/Login.jsx'

export default function IndexOffline () {

   return (

    <Routes> 
      
      <Route index element={<Login/>}/>

      <Route
          path="*"
          element={<Login/>}
      />
      
    </Routes>
  )
}


