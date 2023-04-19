import React from 'react'
import Index from './ui/Index'
import {AppBrowser} from '../../../dist/cli-react/miolo.cli-react.umd.js'

const App = () => {
  return (
    <AppBrowser>
      <Index/>
    </AppBrowser>
  )
}

export default App

