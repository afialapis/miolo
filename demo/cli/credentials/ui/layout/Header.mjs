import React from 'react'
import { NavLink } from "react-router-dom"
import {withContext} from '../../../../miolo-cli-react.mjs'

const ToolbarLink = ({path, name}) => {
  return (
    <NavLink className={({ isActive }) => `link ${isActive ? "dark" : "light"}`} 
             to={path}>
      {name}
    </NavLink>    
  )
}

const Header = ({context}) => {
  return (
    <>
      <div className="grid">

        <div className="logo">
          <div><img src="static/img/miolo_name.png"/></div>
          <div>demo</div>
        </div>
        <div className="toolbar">
          <ToolbarLink name='Todos' path='/todos'/>
          {context?.authenticated
           ? <ToolbarLink name='Logout' path='/logout'/>
           : <ToolbarLink name='Login' path='/login'/>
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
    
export default withContext(Header)
