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
  imageItemContainer: {
    display: 'flex',
    position: 'relative',
  },
  imageItem: {
    top: 0,
    left: 0,
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
  },
  imageGrid: {
    display: 'grid',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(3),

      '&.MuiGrid-root': {
        marginBottom: theme.spacing(1.5),
      },
    },
  },
}))

export default useStyles
