import { makeStyles } from '@material-ui/core'

const highlightRibbonSize = '24px'

const useStyles = makeStyles(theme => ({
  cardRoot: {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      minWidth: 200,
      maxWidth: 200,
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
  highlightRibbon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
    borderTop: `${highlightRibbonSize} solid ${theme.palette.primary.main}`,
    borderRight: `${highlightRibbonSize} solid ${theme.palette.primary.main}`,
    borderBottom: `${highlightRibbonSize} solid transparent`,
    borderLeft: `${highlightRibbonSize} solid transparent`,
    borderTopRightRadius: theme.shape.borderRadius,
    filter:
      'drop-shadow(0px 2px 1px rgba(0,0,0,0.2)) drop-shadow(0px 1px 1px rgba(0,0,0,0.14)) drop-shadow(0px 1px 3px rgba(0,0,0,0.12))',
  },
  highlightStar: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 11,
    color: theme.palette.common.white,
    fontSize: 16,
  },
}))

export default useStyles
