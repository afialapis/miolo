import React, {useCallback, useState} from 'react'
import { useNavigate } from "react-router-dom"
import {withMioloContext} from 'miolo/cli-react'
import LoginForm from './LoginForm.jsx'

const Login = ({login}) => {
  const navigate = useNavigate()
  const [message, setMessage]= useState(undefined)
 
  const doTheLogin = useCallback(async (username, password) => {
    const resp = await login({username, password})

    if (resp.authenticated) {
      setMessage(undefined)
      navigate("/")
    } else {
      setMessage(resp.info)
    }
    
  }, [login, navigate]) 

  return (
    <LoginForm
      onLogin = {doTheLogin}
      message = {message}
    />
  )
}

export default withMioloContext(Login)


