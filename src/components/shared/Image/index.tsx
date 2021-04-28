import { IMAGE_BASE_URL } from 'src/constants'
import useStyles from './styles'

type HTMLImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>

type Props = Omit<HTMLImageProps, 'src'> & {
  id: string
}

export default function Image(props: Props) {
  const classes = useStyles()

  const { id, alt = '', ...rest } = props

  return (
    <img
      alt={alt}
      className={classes.img}
      src={IMAGE_BASE_URL + '/' + id}
      {...rest}
    />
  )
}
