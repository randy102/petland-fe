import { Grid, Paper, Typography } from '@material-ui/core'
import Avatar from 'src/components/shared/Avatar'
import { useAppSelector } from 'src/redux/hooks'
import useStyles from './styles'
import SidebarLink from './SidebarLink'
import { Route, Switch, useRouteMatch } from 'react-router'
import Profile from './Profile'
import ChangePassword from './ChangePassword'

export default function MyAccount() {
  const classes = useStyles()

  const user = useAppSelector(state => state.user)

  const { path, url } = useRouteMatch()

  if (!user) {
    return null
  }

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={3}
      >
        <Grid
          container
          item
          direction="column"
          spacing={2}
        >
          <Grid item>
            <Paper className={classes.infoCard}>
              <Avatar
                className={classes.avatar}
                size={80}
              />

              <div className={classes.infoContainer}>
                <Typography variant="h6">
                  {user?.name}
                </Typography>
              </div>
            </Paper>
          </Grid>

          <Grid item>
            <Paper className={classes.card}>
              <div className={classes.linkGrid}>
                <SidebarLink to={`${url}/profile`}>
                  Thông tin cá nhân
                </SidebarLink>
            
                <SidebarLink to={`${url}/posts`}>
                  Tin đăng của bạn
                </SidebarLink>

                <SidebarLink to={`${url}/change-password`}>
                  Đổi mật khẩu
                </SidebarLink>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs
      >
        <Switch>
          <Route
            component={Profile}
            path={`${path}/profile`}
          />

          <Route
            component={ChangePassword}
            path={`${path}/change-password`}
          />
        </Switch>
      </Grid>
    </Grid>
  )
}
