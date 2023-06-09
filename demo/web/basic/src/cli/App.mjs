import React from 'react'
import Index from './ui/Index.mjs'
import {AppBrowser} from './miolo-cli.mjs'

const CONFIG= {
  hostname: 'localhost',
  port: 8001,
  catcher_url: '/sys/jserror',
  auth_type: 'basic'
}

const App = () => {
  return (
    <AppBrowser config={CONFIG}>
      <Index/>
    </AppBrowser>
  )
}

export default App

