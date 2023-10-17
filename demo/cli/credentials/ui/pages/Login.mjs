import React, {useCallback, useState} from 'react'
import { useNavigate } from "react-router-dom"
import {withContext} from '../../../../miolo-cli-react.mjs'
import LoginForm from './LoginForm.mjs'

const Login = ({setContext, miolo}) => {
  const navigate = useNavigate()
  const [message, setMessage]= useState(undefined)

//  1)
//  ESTOS CALLBACKS LOGIN/LOGOUT PUEDEN ESTAR A NIVEL DE AppContext
//  En el caso de Bonages no valdria porque hay un ssr_data.user_info,
//    pero esa user_info parece duplicada, ya que deberia estar en el Context.user, no?
//    Si es asi podemos eliminar duplicidad y proceder con estos callbacks
//  
//  2)
//  Tb a nivel de AppContext se han de poder poner unos
//    getSsrData()
//
//  Basta uno, con param loader opcional
//
//
//  1) y 2) igual mejor en miolo_client que en AppContext,
//    asi esta en miolo/cli y no en milo/cli-react solo
//    Pero necesitamos cachear el context de alguna manera en vanilla JS,
//    o directamente sobre windows.CONTEXT
//    
//  3)
//  DONE: Auth type 'passport': quiza llamar mejor 'credentials' o algo asi, ya que no hay necesidad de exponer nada de passport
//
//  4)
//  Volver a intentar con que el 'ssr.renderer' no necesite de AppServer. 
//  Daba problemas con el Context. Pero quiza se pueda resolver.
//
//  0000)
//  RECORDAR OBJETIVO FINAL:
//    la config de auth no va a nivel global del Server, sino
//    en cada grupo de routes (o ambos, global y routes)
//

  
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


