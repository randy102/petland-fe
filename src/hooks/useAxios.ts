import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { useEffect, useState } from 'react'

type Config = {
  route: string
  method: Method
}

type Props<Data> = {
  config: Config
  onCompleted?: (data: AxiosResponse<Data>) => void
  onError?: (error: AxiosResponse<any> | undefined) => void
  fetchOnMount?: boolean
}

export default function useAxios<Data>(props: Props<Data>) {
  const { onCompleted, onError } = props

  const [loading, setLoading] = useState<boolean>(!!props.fetchOnMount)

  const [data, setData] = useState<Data>()
  
  async function fetch(config?: AxiosRequestConfig) {
    const { route, method } = props.config

    setLoading(true)

    let defaultConfig: AxiosRequestConfig = {
      method,
      url: `/api/${route}`,
    }

    const token = localStorage.getItem('token')
    if (token) {
      defaultConfig.headers = {
        Authorization: 'Bearer ' + token
      }
    }

    defaultConfig = {
      ...defaultConfig,
      ...config
    }

    axios(defaultConfig).then((response: AxiosResponse<Data>) => {
      setLoading(false)

      setData(response.data)
  
      onCompleted?.(response)
    }).catch((error: AxiosError) => {
      setLoading(false)

      onError?.(error.response)
    })
  }

  useEffect(() => {
    if (props.fetchOnMount) {
      fetch()
    }
  }, [])

  return { data, fetch, loading }
}
