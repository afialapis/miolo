import React, {useContext} from 'react'
import Context from './Context.mjs'

/* eslint react/display-name:0 */
const withContext = (BaseComponent) => (props) => {
  const context = useContext(Context)

  return (
    <BaseComponent {...props}
                   {...context}/>
  );
}


export default withContext