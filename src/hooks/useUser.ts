import { AxiosResponse } from 'axios'
import { useAppDispatch } from 'src/redux/hooks'
import { setUser } from 'src/redux/slices/user'
import { User } from 'src/typings/User'
import useAxios from './useAxios'

type Props = {
  onCompleted?: (data: AxiosResponse<User>) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (error: AxiosResponse<any> | undefined) => void
}

export default function useUser(props?: Props) {
  const { onCompleted, onError } = props || {}

  const dispatch = useAppDispatch()

  // Get user data API
  const { fetch, loading } = useAxios<User>({
    config: {
      method: 'GET',
      route: '/user/profile',
    },
    onCompleted: response => {
      dispatch(setUser(response.data))
      onCompleted?.(response)
    },
    onError,
  })

  return { fetch, loading }
}
