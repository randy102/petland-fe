import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f4f4f4',
      paper: '#fff',
    },
    primary: {
      contrastText: '#fff',
      main: '#53c4b2',
    },
    secondary: {
      contrastText: '#000',
      main: '#ffc8b3',
    },
  },
})

export default theme
