type HTMLImageProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

type Props = Omit<HTMLImageProps, 'src'> & {
  id: string
}

const IMAGE_BASE_URL = process.env.REACT_APP_S3URL

export default function Image(props: Props) {
  const { id, ...rest } = props

  return (
    <img
      src={IMAGE_BASE_URL + '/' + id}
      {...rest}
    />
  )
}
