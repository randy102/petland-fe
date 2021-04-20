import { Box, Icon, MenuItem, Typography } from '@material-ui/core'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import { bindHover, bindMenu, usePopupState } from 'material-ui-popup-state/hooks'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import Image from '../Image'
import useStyles from './styles'
import theme from 'src/theme'
import { logout } from 'src/redux/slices/user'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar'

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
      <Avatar />

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
