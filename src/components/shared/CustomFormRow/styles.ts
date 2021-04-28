import { makeStyles, Theme } from '@material-ui/core'

type Props = {
  error?: boolean
}

const useStyles = makeStyles<Theme, Props>(theme => ({
  fullWidth: {
    width: '100%',
  },
  root: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: props =>
      props.error ? theme.palette.error.main : 'rgba(0, 0, 0, 0.23)',
    borderRadius: theme.shape.borderRadius,
    padding: '18.5px 14px',
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 12,
    transform: 'translate(9px, -6px)',
    lineHeight: 1,
    background: theme.palette.common.white,
    transformOrigin: 'top left',
    color: props =>
      props.error ? theme.palette.error.main : 'rgba(0, 0, 0, 0.54)',
  },
}))

export default useStyles
