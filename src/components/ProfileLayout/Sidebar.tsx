import { Grid, Paper } from '@material-ui/core'
import SidebarLink from './SidebarLink'
import useStyles from './styles'

export default function Sidebar() {
  const classes = useStyles()

  return (
    <Grid
      container
      item
      direction="column"
      spacing={2}
    >
      <Grid item>
        <Paper className={classes.paper}>
          Avatar and name
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
    
  )
}
