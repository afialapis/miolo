import React, {useCallback} from 'react'
import { useNavigate } from "react-router-dom"
import {withMioloContext} from 'miolo-react'
import {LoginForm} from '#cli/components/login-form.jsx'

const Login = ({login}) => {
  const navigate = useNavigate()
 
  const doTheLogin = useCallback(async (username, password) => {
    const resp = await login({username, password})

    if (resp.authenticated) {
      navigate("/")
    }

    return resp
    
  }, [login, navigate]) 

  return (

    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          onLogin = {doTheLogin}
        />
      </div>
    </div>    
  )
}

export default withMioloContext(Login)


