import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  cardRoot: {
    overflow: 'visible',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      minWidth: 180,
    },
  },
  actionArea: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  mainImageContainer: {
    paddingTop: 'calc(100% / 3 * 2)',
    width: '100%',
    position: 'relative',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  mainImage: {
    position: 'absolute',
    top: 0,
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  title: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    marginBottom: 'auto',
  },
  info: {
    color: theme.palette.grey['600'],
  },
  singleLineEllipsis: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  price: {
    fontWeight: 500,
    lineHeight: 1.2,
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  hotRibbon: {
    position: 'absolute',
    zIndex: 10,
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 ${theme.shape.borderRadius}px`,
    padding: '4px 10px',
    right: -4,
    top: 4,
    background: theme.palette.primary.main,
    textAlign: 'center',
    verticalAlign: 'middle',
    fontWeight: 600,
    color: theme.palette.primary.contrastText,
    '&:after': {
      content: '""',
      position: 'absolute',
      right: 0,
      bottom: -4,
      borderLeft: `2px solid ${theme.palette.primary.dark}`,
      borderTop: `2px solid ${theme.palette.primary.dark}`,
      borderRight: '2px solid transparent',
      borderBottom: '2px solid transparent',
    },
  },
}))

export default useStyles
