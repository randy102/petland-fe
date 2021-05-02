import useStyles from '../MyAccount/styles'
import { useAppSelector } from '../../../redux/hooks'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router'
import { useMemo } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import TextLink from '../../shared/TextLink'
import ChargeRequest from './ChargeRequest'
import History from './History'

export default function Point() {
  const classes = useStyles()

  const user = useAppSelector(state => state.user)

  const { path, url } = useRouteMatch()

  const sidebarLinks = useMemo(
    () => [
      {
        to: '/charge-request',
        label: 'Yêu cầu nạp điểm',
      },
      {
        to: '/history',
        label: 'Lịch sử giao dịch',
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
              <div className={classes.infoContainer}>
                <Typography style={{ paddingLeft: 10 }} variant="h6">
                  Điểm: {user?.points}
                </Typography>
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
          <Route component={ChargeRequest} path={`${path}/charge-request`} />

          <Route component={History} path={`${path}/history`} />

          <Route exact path={`${path}`}>
            <Redirect to={`${path}/charge-request`} />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  )
}
