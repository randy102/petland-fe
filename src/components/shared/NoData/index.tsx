import { Icon, Typography } from '@material-ui/core'
import useStyles from './styles'

export default function NoData() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Icon className="far fa-frown" fontSize="large" />

      <Typography className={classes.text}>Không có dữ liệu</Typography>
    </div>
  )
}
