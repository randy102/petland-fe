import React, { ReactNode } from 'react'
import { useAppDispatch } from '../../../redux/hooks'
import { setAds } from '../../../redux/slices/ads'
import useAxios from '../../../hooks/useAxios'
import { Ad } from '../../../typings/Ad'

type Props = {
  children: ReactNode
}
export default function AdsProvider(props: Props) {
  const dispatch = useAppDispatch()
  useAxios<Ad[]>({
    config: {
      method: 'get',
      route: 'ads',
    },
    fetchOnMount: true,
    onCompleted: res => {
      dispatch(setAds(res.data))
    },
  })

  return <>{props.children}</>
}
