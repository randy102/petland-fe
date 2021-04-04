import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { useEffect, useState } from 'react'

type Config = {
  route: string
  method: Method
}

type Props<Data> = {
  config: Config
  onCompleted?: (data: AxiosResponse<Data>) => void
  onError?: (error: AxiosError) => void
  fetchOnMount?: boolean
}

export default function useAxios<Data>(props: Props<Data>) {
  const { onCompleted, onError } = props

  const [loading, setLoading] = useState<boolean>(!!props.fetchOnMount)

  async function fetch(config?: Omit<AxiosRequestConfig, 'method' | 'url'>) {
    const { route, method } = props.config

    setLoading(true)

    axios({
      method,
      url: `${process.env.REACT_APP_API_BASE_URL}/api/${route}`,
      ...config,
    }).then((response: AxiosResponse<Data>) => {
      setLoading(false)
  
      onCompleted?.(response)
    }).catch((error: AxiosError) => {
      setLoading(false)

      onError?.(error)
    })
  }

  useEffect(() => {
    if (props.fetchOnMount) {
      fetch()
    }
  }, [])

  return { fetch, loading }
}
