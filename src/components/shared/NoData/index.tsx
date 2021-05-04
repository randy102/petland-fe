import { Typography } from '@material-ui/core'
import useStyles from './styles'

export default function NoData() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <i className={'far fa-frown ' + classes.icon} />

      <Typography className={classes.text}>Không có dữ liệu</Typography>
    </div>
  )
}
