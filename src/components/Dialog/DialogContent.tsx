import {
  withStyles,
  DialogContent as MuiDialogContent,
} from '@material-ui/core';

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default DialogContent;
