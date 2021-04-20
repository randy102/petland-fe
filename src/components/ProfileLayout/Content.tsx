import { Box, Paper, Typography } from '@material-ui/core'
import useStyles from './styles'

type Props = {
  children: React.ReactNode
  title: string
}

export default function Content(props: Props) {
  const classes = useStyles()

  return (
    <Paper>
      <div className={classes.contentHeader}>
        <Typography
          color="textPrimary"
          variant="h6"
        >
          {props.title}
        </Typography>
      </div>

      <Box padding={2}>
        {props.children}
      </Box>
    </Paper>
  )
}
