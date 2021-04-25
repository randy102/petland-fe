import { Grid, Paper, Typography } from '@material-ui/core'
import Avatar from 'src/components/shared/Avatar'
import { useAppSelector } from 'src/redux/hooks'
import useStyles from './styles'
import { Route, Switch, useRouteMatch } from 'react-router'
import Profile from './Profile'
import ChangePassword from './ChangePassword'
import { useMemo } from 'react'
import TextLink from 'src/components/shared/TextLink'

export default function MyAccount() {
  const classes = useStyles()

  const user = useAppSelector(state => state.user)

  const { path, url } = useRouteMatch()

  const sidebarLinks = useMemo(
    () => [
      {
        to: '/profile',
        label: 'Thông tin cá nhân',
      },
      {
        to: '/posts',
        label: 'Bài đăng của bạn',
      },
      {
        to: '/change-password',
        label: 'Đổi mật khẩu',
      },
    ],
    []
  )

  if (!user) {
    return null
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Grid container item direction="column" spacing={2}>
          <Grid item>
            <Paper className={classes.infoCard}>
              <Avatar className={classes.avatar} size={80} />

              <div className={classes.infoContainer}>
                <Typography variant="h6">{user?.name}</Typography>
              </div>
            </Paper>
          </Grid>

          <Grid item>
            <Paper className={classes.card}>
              <div className={classes.linkGrid}>
                {sidebarLinks.map(link => (
                  <TextLink
                    color={
                      window.location.pathname === url + link.to
                        ? 'primary'
                        : 'inherit'
                    }
                    key={link.to}
                    to={url + link.to}
                    underline="none"
                  >
                    {link.label}
                  </TextLink>
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs>
        <Switch>
          <Route component={Profile} path={`${path}/profile`} />

          <Route component={ChangePassword} path={`${path}/change-password`} />
        </Switch>
      </Grid>
    </Grid>
  )
}
