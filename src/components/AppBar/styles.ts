import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  logo: {
    height: 48,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  loginButtonRoot: {
    marginLeft: 'auto',
    marginRight: theme.spacing(2),
  },
}));

export default useStyles;
