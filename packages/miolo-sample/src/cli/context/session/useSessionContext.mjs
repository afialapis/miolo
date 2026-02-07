import {useContext} from 'react'
import SessionContext from './SessionContext.mjs'

const useSessionContext = () => useContext(SessionContext)

export default useSessionContext
