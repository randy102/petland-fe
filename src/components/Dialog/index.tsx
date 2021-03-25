import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from '@material-ui/core';
import DialogContent from './DialogContent';
import DialogTitle from './DialogTitle';

export type DialogProps = MuiDialogProps & {
  onClose?: () => void;
};

export default function Dialog(props: DialogProps) {
  const { title, ...rest } = props;

  return (
    <MuiDialog {...rest}>
      {title && <DialogTitle onClose={props.onClose}>{title}</DialogTitle>}

      <DialogContent>{props.children}</DialogContent>
    </MuiDialog>
  );
}
