import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

type Config = {
  route: string
  method: Method
}

type Props<Data> = {
  config: Config
  onCompleted?: (data: AxiosResponse<Data>) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (error: AxiosResponse<any> | undefined) => void
  fetchOnMount?: boolean
}

export default function useAxios<Data>(props: Props<Data>) {
  const { onCompleted, onError } = props

  const { enqueueSnackbar } = useSnackbar()

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

      console.log('Error:', { error })
      
      // Toast error message if available
      if (error?.response?.data.message) {
        enqueueSnackbar(error?.response?.data.message, { variant: 'error' })
      }

      onError?.(error.response)
    })
  }

  useEffect(() => {
    if (props.fetchOnMount) {
      fetch()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, fetch, loading }
}
