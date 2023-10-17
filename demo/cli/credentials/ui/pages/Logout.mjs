import React from 'react'
import {withContext} from '../../../../miolo-cli-react.mjs'
import LogoutForm from './LogoutForm.mjs'

const Logout = ({logout}) => {
  
  return (
    <LogoutForm
      onLogout = {logout}
    />
  )
}

export default withContext(Logout)


