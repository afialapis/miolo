import React from 'react'


const Header = () => {
  return (
    <>
      <div className="grid">

        <div className="logo">
          <div><img src="static/img/miolo_name.png"/></div>
          <div>demo</div>
        </div>
        <div className="toolbar">
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
    
export default Header
