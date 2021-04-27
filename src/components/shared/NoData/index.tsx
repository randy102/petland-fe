import { Typography } from '@material-ui/core'
import { SentimentDissatisfiedRounded } from '@material-ui/icons'
import useStyles from './styles'

export default function NoData() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <SentimentDissatisfiedRounded fontSize="large" />

      <Typography className={classes.text}>Không có dữ liệu</Typography>
    </div>
  )
}
