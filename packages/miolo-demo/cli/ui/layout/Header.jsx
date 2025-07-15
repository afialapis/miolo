import React from 'react'
import { NavLink } from "react-router-dom"
import {withMioloContext} from 'miolo-react'
import useAuthType from '../useAuthType.mjs'

const ToolbarLink = ({path, name}) => {
  return (
    <NavLink className={({ isActive }) => `link ${isActive ? "dark" : "light"}`} 
             to={path}>
      {name}
    </NavLink>    
  )
}

const ToolbarButton = ({onClick, name, authenticated}) => {
  return (
    <a className={`link ${!authenticated ? "dark" : "light"}`} 
      onClick={onClick}>
      {name}
    </a>    
  )
}

const Header = ({authenticated, fetcher}) => {
  const authType = useAuthType()

  const handleBasicLogin = () => {
    fetcher.set_auth({
      username: 'todoer',
      password: 'todoer'
    })
  
  }
  
  return (
    <>
      <div className="grid">

        <div className="logo">
          <div><img src="static/img/miolo_name.png"/></div>
          <div>demo</div>
        </div>
        <div className="toolbar">
          
          { (authType==='guest')
            ? null
            : (authType==='basic')
            ? <ToolbarButton name='Enable BasicAuth' onClick={handleBasicLogin} authenticated={authenticated}/>
            : <>
                <ToolbarLink name='Todos' path='todos'/>
                {authenticated
                ? <ToolbarLink name='Logout' path='logout'/>
                : <ToolbarLink name='Login' path='login'/>
                }
              </>
          }
          <a className="link github" 
            href     = {"https://github.com/afialapis"}
            target   = "_blank"
            rel      = "noreferrer">
            <img src="static/img/github.png" />
          </a>  
        </div>
      </div>


    </>
  )
}
    
export default withMioloContext(Header)
