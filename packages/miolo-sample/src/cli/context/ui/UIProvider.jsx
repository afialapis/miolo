import React from 'react'
import { toast } from "sonner"
import UIContext from './UIContext.jsx'

const UIProvider = ({children}) => {
  
  return (
    <UIContext.Provider value={{
      toast
    }}>
      {children}
    </UIContext.Provider>
  )
}

export default UIProvider
