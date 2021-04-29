import { useEffect } from 'react'
import { useParams } from 'react-router'
import useStyles from './styles'

type Params = {
  id: string
}

export default function EditPost() {
  const classes = useStyles()

  const { id } = useParams<Params>()

  useEffect(() => {
    console.log('Post id:', id)
  })

  return <div>Edit Post</div>
}
