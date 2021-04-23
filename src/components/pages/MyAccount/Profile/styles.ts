import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  avatarButton: {
    boxShadow: `
      0px 3px 5px -1px rgb(0 0 0 / 20%), 
      0px 6px 10px 0px rgb(0 0 0 / 14%), 
      0px 1px 18px 0px rgb(0 0 0 / 12%), 
      0px 0px 0px 4px white`,
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translate(65%, -50%)',
  },
  avatarContainer: {
    display: 'flex',
    width: 'fit-content',
    margin: '0 auto',
    position: 'relative',
  },
}))

export default useStyles
