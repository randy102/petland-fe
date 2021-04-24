import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  fullWidth: {
    width: '100%',
  },
  root: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
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
    color: 'rgba(0, 0, 0, 0.54)',
  },
}))

export default useStyles
