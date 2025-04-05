import React from 'react'
import {withContext} from '../../../../miolo-cli-react.mjs'
import LogoutForm from './LogoutForm.jsx'

const Logout = ({logout}) => {
  
  return (
    <LogoutForm
      onLogout = {logout}
    />
  )
}

export default withContext(Logout)


