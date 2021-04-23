import { Paper, Typography } from '@material-ui/core'
import useStyles from './styles'
import React from 'react'

type Props = {
  title: string
  children: React.ReactNode
}

export default function CardWithTitle(props: Props) {
  const classes = useStyles()

  return (
    <Paper className={classes.card}>
      <div className={classes.header}>
        <Typography className={classes.title} variant="h6">
          {props.title}
        </Typography>
      </div>

      {props.children}
    </Paper>
  )
}
