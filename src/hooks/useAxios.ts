import axios, { AxiosError, AxiosResponse, Method } from 'axios'
import { useState } from 'react'

type Config = {
  route: string
  method: Method
}

type Props<T> = {
  config: Config
  onCompleted: (data: AxiosResponse<T>) => void
  onError: (error: AxiosError) => void
}

export default function useAxios<T>(props: Props<T>) {
  const { onCompleted, onError } = props

  const [loading, setLoading] = useState<boolean>(false)

  async function fetch(config?: Config) {
    const { route, method } = config || props.config

    setLoading(true)

    axios({
      method: method,
      url: `${process.env.API_BASE_URL}/api/${route}`
    }).then((response: AxiosResponse<T>) => {
      setLoading(false)
  
      onCompleted(response)
    }).catch((error: AxiosError) => {
      setLoading(false)

      onError(error)
    })
  }

  return { fetch, loading }
}
