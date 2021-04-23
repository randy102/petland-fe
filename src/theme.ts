import { createMuiTheme } from '@material-ui/core'

const defaultTheme = createMuiTheme()

const theme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      asterisk: {
        '&$error': {
          color: '#db3131',
        },
        color: '#db3131',
      },
    },
  },
  palette: {
    background: {
      default: '#f4f4f4',
      paper: '#fff',
    },
    primary: {
      contrastText: '#fff',
      main: '#53c4b1',
    },
    secondary: {
      contrastText: '#000',
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
  },
})

export default theme
