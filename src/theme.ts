import { createMuiTheme } from '@material-ui/core'

const defaultTheme = createMuiTheme()

const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: '#fff',
      main: '#53c4b1',
    },
    secondary: {
      contrastText: '#333333',
      main: '#ffc8b3',
    },
  },
  props: {
    MuiButton: {
      color: 'primary',
      variant: 'contained',
    },
    MuiFormControl: {
      variant: 'outlined',
    },
    MuiMenu: {
      anchorOrigin: {
        horizontal: 'center',
        vertical: 'bottom',
      },
      getContentAnchorEl: null,
      transformOrigin: {
        horizontal: 'center',
        vertical: defaultTheme.spacing(-0.5),
      },
    },
    MuiTextField: {
      variant: 'outlined',
    },
    MuiRadio: {
      color: 'default',
    },
  },
})

export default theme
