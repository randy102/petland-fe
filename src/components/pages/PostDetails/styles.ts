import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  column: {
    width: `calc(50% - ${theme.spacing(1)}px)`,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  slider: {
    '& .image-gallery-slides': {
      borderRadius: theme.shape.borderRadius,
    },
    '& .image-gallery-thumbnails': {
      display: 'flex',
    },
    '& .image-gallery-thumbnails-container button': {
      borderRadius: 8,
      overflow: 'hidden',
      cursor: 'pointer',
    },
    '& .image-gallery-thumbnail-inner': {
      paddingTop: '100%',
      position: 'relative',
      '& .image-gallery-thumbnail-image': {
        position: 'absolute',
        height: '100%',
        top: 0,
        left: 0,
        objectFit: 'cover',
      },
    },
    '& .image-gallery-thumbnail.active': {
      borderColor: theme.palette.primary.main,
    },
    '& .image-gallery-thumbnail:hover': {
      borderColor: theme.palette.primary.main,
    },
    '& .image-gallery-slide > div': {
      position: 'relative',
      paddingTop: '100%',
      '& .image-gallery-image': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
    '& .image-gallery-content.fullscreen .image-gallery-slide > div': {
      paddingTop: 'calc(100vh - 120px)',

      '& > img': {
        objectFit: 'contain',
      },
    },
  },
  iconButton: {
    position: 'absolute',
    zIndex: 4,
    color: theme.palette.common.white,
    filter:
      'drop-shadow(0px 3px 1px rgb(0 0 0 / 20%)) drop-shadow(0px 2px 2px rgb(0 0 0 / 14%)) drop-shadow(0px 1px 5px rgb(0 0 0 / 12%))',
  },
  navButton: {
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: 50,
  },
  navButtonRight: {
    right: 0,
  },
  navButtonLeft: {
    left: 0,
  },
  fullscreenButton: {
    right: 0,
    bottom: 0,
    fontSize: 40,
  },
  title: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  callButtonIcon: {
    marginRight: theme.spacing(0.5),
  },
  td: {
    paddingBottom: theme.spacing(1),

    '&:nth-child(2)': {
      paddingRight: theme.spacing(2),
    },
  },
  userInfo: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  infoLabel: {
    whiteSpace: 'nowrap',
  },
  userName: {
    fontWeight: 500,
  },
  userAvatar: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius,
  },
  defaultAvatar: {
    fontSize: 50,
    background: theme.palette.grey['300'],
    color: theme.palette.grey['500'],
    borderRadius: theme.shape.borderRadius,
  },
  singleLineEllipsis: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}))

export default useStyles
