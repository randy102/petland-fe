import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: theme.spacing(1.5),
    '&::after': {
      content: '""',
      minWidth: theme.spacing(0.5),
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      overflowX: 'scroll',
      paddingBottom: 2,
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(-2),
      padding: `0 ${theme.spacing(2)}px`,
    },
  },
  title: {
    fontWeight: 500,
  },
  seeMoreBtn: {
    display: 'block',
    margin: '0 auto',
    marginTop: theme.spacing(1.5),
    padding: '6px 120px',
    width: 'fit-content',
  },
  seeMoreCard: {
    minWidth: 180,
  },
  seeMoreActionArea: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreIcon: {
    fontSize: theme.typography.h4.fontSize,
    marginBottom: theme.spacing(0.5),
  },
  endPadding: {
    minWidth: theme.spacing(0.5),
  },
  noDataCard: {
    minHeight: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default useStyles
