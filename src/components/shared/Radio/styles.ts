import { makeStyles, Theme } from '@material-ui/core'

type Props = {
  color?: 'primary' | 'secondary'
}

const useStyles = makeStyles<Theme, Props>(theme => ({
  checked: props => ({
    color:
      props.color === 'secondary'
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
  }),
}))

export default useStyles
