import useStyles from './styles';

import { DialogTitle as MuiDialogTitle, Typography } from '@material-ui/core';
import CloseButton from './CloseButton';

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

export default function DialogTitle(props: Props) {
  const { children, onClose } = props;

  const classes = useStyles();

  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>

      {onClose && <CloseButton onClick={onClose} />}
    </MuiDialogTitle>
  );
}
