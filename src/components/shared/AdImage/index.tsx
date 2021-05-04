import React from 'react'
import Image from '../Image'
import { useAppSelector } from '../../../redux/hooks'

type Props = {
  code: string
}

export default function AdImage(props: Props) {
  const ads = useAppSelector(state =>
    state.ads?.find(ad => ad.position === props.code)
  )
  return (
    <a
      href={ads?.url}
      rel="noreferrer"
      style={{ textAlign: 'center' }}
      target="_blank"
    >
      <Image
        alt={ads?.partner}
        id={ads?.fileID || ''}
        style={{ maxWidth: 800 }}
      />
    </a>
  )
}
