import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  imageDeleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 'fit-content',
    padding: 4,
    background: theme.palette.error.main,
    '&:hover': {
      background: theme.palette.error.dark,
    },
  },
  imagePinButton: {
    position: 'absolute',
    top: 4,
    left: 4,
    minWidth: 'fit-content',
    padding: 4,
    background: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  imageItemContainer: {
    display: 'flex',
    position: 'relative',
    paddingTop: '100%',
  },
  imageItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  marginBottom1: {
    marginBottom: theme.spacing(1),
  },
  marginBottom3: {
    marginBottom: theme.spacing(3),
  },
  marginBottom15: {
    marginBottom: theme.spacing(1.5),
  },
}))

export default useStyles
