import { Box, Icon, MenuItem, Typography } from '@material-ui/core'
import { bindHover, bindMenu, usePopupState } from 'material-ui-popup-state/hooks'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { logout } from 'src/redux/slices/user'
import theme from 'src/theme'
import Avatar from '../Avatar'
import useStyles from './styles'

function MenuItemContent(props: {
  text: string
  icon: string
}) {
  const { text, icon } = props

  return (
    <Box
      alignItems="center"
      display="flex"
    >
      <Icon>{icon}</Icon>
      <Box ml={1.25}>{text}</Box>
    </Box>
  )
}

export default function User() {
  const user = useAppSelector(state => state.user)

  const classes = useStyles()

  const dispatch = useAppDispatch()

  const history = useHistory()

  const popupState = usePopupState({ popupId: 'userMenu', variant: 'popover' })

  function handleLogout() {
    dispatch(logout())
    history.push('/')
    popupState.close()
  }

  return (
    <div
      className={classes.avatarContainer}
      {...bindHover(popupState)}
    >
      <Avatar size={48} />

      <HoverMenu
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom'
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: theme.spacing(-0.5),
        }}
        {...bindMenu(popupState)}
      >
        <Box
          px={2}
          py={1}
          width="100%"
        >
          <Typography>
            {user?.name}
          </Typography>
        </Box>

        <MenuItem
          component={Link}
          to="/my-posts"
          onClick={popupState.close}
        >
          <MenuItemContent
            icon="pets"
            text="Bài đăng của bạn"
          />
        </MenuItem>

        <MenuItem
          component={Link}
          to="/my-profile"
          onClick={popupState.close}
        >
          <MenuItemContent
            icon="account_circle"
            text="Thông tin cá nhân"
          />
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <MenuItemContent
            icon="power_settings_new"
            text="Đăng xuất"
          />
        </MenuItem>
      </HoverMenu>
    </div>
  )

}
