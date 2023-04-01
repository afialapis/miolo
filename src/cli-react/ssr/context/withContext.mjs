import React, {useContext} from 'react'
import Context from './Context.mjs'

/* eslint react/display-name:0 */
const withContext = BaseComponent => (props) => {
  const {context, setContext} = useContext(Context)

  console.log('WITH CONTEXT')
  console.log('WITH CONTEXT')
  console.log('WITH CONTEXT')
  console.log(context)

  return (
    <BaseComponent {...props}
                   context = {context}
                   setContext= {setContext}/>
  );
}


export default withContext