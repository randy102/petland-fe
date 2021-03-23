import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export default function PetlandAppBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
