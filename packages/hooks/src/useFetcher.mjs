import {useRef} from 'react'
import {Fetcher} from 'miolo-tools'

const useFetcher = () => {
  const fetcher = useRef(new Fetcher())
  return fetcher.current
}

export {Fetcher, useFetcher}
