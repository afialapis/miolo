import React, {useState} from 'react'

const LoginForm = ({onLogin, message}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="login">

      <div className="login-field-group">
        <h5>
          Username
        </h5>

        <div className="input-container">
          <input type="text" 
                placeholder="John Doe" 
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}/>
        </div>
      </div>

      <div className="login-field-group">
        <h5>
          Password
        </h5>

        <div className="input-container">
          <input type="password" 
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}/>
        </div>
      </div>

      <div className="login-action">
        <div className={`button--primary ${(username.length==0 || password.length==0)? 'disabled' : ''}`}
                onClick={() => onLogin(username, password) }>
          Login
        </div>
      </div>
      
      {message!=undefined
       ?
        <div className="login-message">
          {message}
        </div>
       : null}

    
    </div>

  )
}

export default LoginForm


