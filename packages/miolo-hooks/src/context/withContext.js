import React, {useContext} from 'react'
import Context from './Context'

/* eslint react/display-name:0 */
const withContext = BaseComponent => (props) => {
  const {context, setContext} = useContext(Context)

  return (
    <BaseComponent {...props}
                   context = {context}
                   setContext= {setContext}/>
  );
}


export default withContext