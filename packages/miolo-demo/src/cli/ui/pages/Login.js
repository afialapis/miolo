import React, {useCallback, useState} from 'react'
import { useNavigate } from "react-router-dom";
import {withContext, useFetcher} from 'miolo-hooks'
import LoginForm from './LoginForm'

const Login = ({setState}) => {
  const fetcher = useFetcher()
  const navigate = useNavigate()
  const [message, setMessage]= useState(undefined)
  
  const doTheLogin = useCallback(async (username, password) => {
    const {data} = await fetcher.post('/login', {username, password})

    if (data.authenticated) {
      setState(data)
      navigate("/")
      setMessage(undefined)
    } else {
      setMessage(data.info)
    }
    
  }, [fetcher, setState, navigate]) 

  return (
    <LoginForm
      onLogin = {doTheLogin}
      message = {message}
    />
  )
}

export default withContext(Login)


