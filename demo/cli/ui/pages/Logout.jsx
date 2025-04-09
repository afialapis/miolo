import React from 'react'
import {withMioloContext} from 'miolo/cli-react'
import LogoutForm from './LogoutForm.jsx'

const Logout = ({logout}) => {
  
  return (
    <LogoutForm
      onLogout = {logout}
    />
  )
}

export default withMioloContext(Logout)


