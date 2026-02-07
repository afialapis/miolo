import React, { useState, /*useCallback,*/ useEffect} from 'react'
import { isBrowser } from '#cli/lib/utils.mjs'

const getStorageKey = (key) => {
  if (isBrowser()) {
    return `${encodeURIComponent(window.location.pathname)}_${key || ''}`
  }
  return undefined
}

const getPersisted = (key, defValue) => {
  if (isBrowser()) {
    const k= getStorageKey(key)
    const v= localStorage.getItem(k)
    try {
      const p= JSON.parse(v)
      if (p!=undefined && p!=null) {
        return p
      }
    } catch(e) {}
  }
  return defValue
}

const setPersisted = (key, value) => {
  if (isBrowser()) {
    const k= getStorageKey(key)

    localStorage.setItem(k, JSON.stringify(value))
  }  
}


const useStoragedState = (defValue, key) => {

  const [value, setValue]= useState(getPersisted(key, defValue))

  /*
    const setStoragedValue = useCallback((newValue) => {
      setPersisted(key, newValue)
      setValue(newValue)
    }, [key])
    return [value, setStoragedValue]
  
  */

  //
  // Returning and exposing setValue, we allow
  // to use functional setValue() too!
  //

  useEffect(() => {
    setPersisted(key, value)
  }, [key, value])

  /*
  const wrapSetValue = useCallback((nValue) => {
    setPersisted(key, typeof nValue =='function' ? nValue(value) : nValue)
    setValue(nValue)
  }, [key, value])*/

  return [value, setValue]
}

export {useStoragedState}