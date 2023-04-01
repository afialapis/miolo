import React from 'react'

const LogoutForm = ({onLogout}) => {

  return (
    <div className="logout">

      <div className="goodbye">
        Farewell adiós my friend
      </div>

      <div className="logout-action">
        <div className="button--primary"
                onClick={() => onLogout() }>
          Logout
        </div>
      </div>

    
    </div>
  )
}

export default LogoutForm


