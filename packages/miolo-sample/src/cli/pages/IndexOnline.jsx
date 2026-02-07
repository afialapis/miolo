import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '#cli/layout/main-layout.jsx'
import Dashboard from '#cli/pages/dash/Dashboard.jsx'
import Security from '#cli/pages/security/Security.jsx'

export default function IndexOnline () {
  return (
    <Routes>
      <Route path={'/'} element={<MainLayout/>}>
        <Route index      element={<Dashboard/>}/>
 
        <Route path={'security'} element={<Security/>}/>

        <Route path={'*'} element={<Dashboard/>}/>
      </Route>
    </Routes>
  )
}

