import React, {useCallback, useState} from 'react'
import { useNavigate } from "react-router-dom"
import {withContext} from '../../../../miolo-cli-react.mjs'
import LoginForm from './LoginForm.mjs'

const Login = ({setContext, miolo}) => {
  const navigate = useNavigate()
  const [message, setMessage]= useState(undefined)
  
  const doTheLogin = useCallback(async (username, password) => {
    const {data} = await miolo.fetcher.login('/login', {username, password})

    if (data.authenticated) {
      setMessage(undefined)
      navigate("/")
      setContext(data)
    } else {
      setMessage(data.info)
    }
    
  }, [miolo, setContext, navigate]) 

  return (
    <LoginForm
      onLogin = {doTheLogin}
      message = {message}
    />
  )
}

export default withContext(Login)


