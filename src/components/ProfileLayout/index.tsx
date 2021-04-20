import { Box, Grid, Icon, Paper, Typography } from '@material-ui/core'
import { useAppSelector } from 'src/redux/hooks'
import theme from 'src/theme'
import Avatar from '../Avatar'
import Image from '../Image'
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
                background={theme.palette.grey['500']}
                borderBottomRightRadius={0}
                borderTopRightRadius={0}
                color={theme.palette.common.white}
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
            <Paper className={classes.paper}>
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
        <Paper>
          <div className={classes.contentHeader}>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              {props.title}
            </Typography>
          </div>

          <Box padding={2}>
            {props.children}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
