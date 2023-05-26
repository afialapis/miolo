import {useRef} from 'react'
import {Fetcher} from '../../cli/fetcher/index.mjs'

const useFetcher = () => {
  const fetcher = useRef(new Fetcher())
  return fetcher.current
}

export {useFetcher}
