import { Box, Grid, Paper, Typography } from '@material-ui/core'
import { useAppSelector } from 'src/redux/hooks'
import Avatar from '../Avatar'
import SidebarLink from './SidebarLink'
import useStyles from './styles'

type Props = {
  children: React.ReactNode
  title: string
}

export default function ProfileLayout(props: Props) {
  const classes = useStyles()

  const user = useAppSelector(state => state.user)

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
                <SidebarLink to="/my-profile">
                  Thông tin cá nhân
                </SidebarLink>
            
                <SidebarLink to="/my-posts">
                  Bài đăng của bạn
                </SidebarLink>

                <SidebarLink to="/change-password">
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
        <Paper className={classes.card}>
          <div className={classes.cardHeader}>
            <Typography
              className={classes.title}
              variant="h6"
            >
              {props.title}
            </Typography>
          </div>

          {props.children}
        </Paper>
      </Grid>
    </Grid>
  )
}
