import {useRef} from 'react'
import {Fetcher} from './Fetcher.mjs'

const useFetcher = () => {
  const fetcher = useRef(new Fetcher())
  return fetcher.current
}

export {useFetcher}
