import IconButton from '@material-ui/core/IconButton/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './styles';

type Props = {
  onClick?: () => void;
};

export default function CloseButton(props: Props) {
  const classes = useStyles();

  return (
    <IconButton
      aria-label="close"
      className={classes.closeButton}
      onClick={props.onClick}
    >
      <CloseIcon />
    </IconButton>
  );
}
