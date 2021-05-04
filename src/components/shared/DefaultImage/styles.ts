import { makeStyles, Theme } from '@material-ui/core'

type Props = {
  fontSize?: string | number
}

const useStyles = makeStyles<Theme, Props>(theme => ({
  root: {
    color: theme.palette.grey['400'],
    background: theme.palette.grey['300'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: props => props.fontSize,
  },
}))

export default useStyles
