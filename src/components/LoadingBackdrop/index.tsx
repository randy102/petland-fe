import { Backdrop, CircularProgress } from '@material-ui/core'
import useStyles from './styles'

type Props = {
  open: boolean
}

export default function LoadingBackdrop(props: Props) {
  const classes = useStyles()
  
  return (
    <Backdrop
      className={classes.backdrop}
      open={props.open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
