import {useRef} from 'react'
import {Fetcher} from 'calustra/fetcher'

const useFetcher = () => {
  const fetcher = useRef(new Fetcher())
  return fetcher.current
}

export {useFetcher}
