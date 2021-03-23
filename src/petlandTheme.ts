import { createMuiTheme } from '@material-ui/core';

const petlandTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#53c4b2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffc8b3',
      contrastText: '#000',
    },
    background: {
      default: '#f4f4f4',
      paper: '#fff',
    },
  },
});

export default petlandTheme;
