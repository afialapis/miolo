import React, {useCallback, useState} from 'react'
import { useNavigate } from "react-router-dom";
import {withContext, useFetcher} from 'miolo-cli-tools'
import LoginForm from './LoginForm'

const Login = ({setContext}) => {
  const fetcher = useFetcher()
  const navigate = useNavigate()
  const [message, setMessage]= useState(undefined)
  
  const doTheLogin = useCallback(async (username, password) => {
    const {data} = await fetcher.post('/login', {username, password})

    if (data.authenticated) {
      setMessage(undefined)
      navigate("/")
      setContext(data)
    } else {
      setMessage(data.info)
    }
    
  }, [fetcher, setContext, navigate]) 

  return (
    <LoginForm
      onLogin = {doTheLogin}
      message = {message}
    />
  )
}

export default withContext(Login)


