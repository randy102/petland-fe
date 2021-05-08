import React from 'react'
import {
  Chat,
  ContactSupport,
  ListAlt,
  Notifications,
} from '@material-ui/icons'
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import theme from '../../../theme'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import {
  Avatar,
  Badge,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core'
import useAxios from '../../../hooks/useAxios'
import epochToString from '../../../helpers/epochToString'
import { useHistory } from 'react-router'

type Notification = {
  _id: string
  message: string
  read: boolean
  postID: string
  qaID: string
  createdAt: number
  isPostVerify: boolean
}

function getNotificationLink(notification: Notification) {
  if (notification.isPostVerify) {
    return '/my-account/posts'
  }
  if (notification.qaID) {
    return `/post-details/${notification.postID}?question=${notification.qaID}`
  }
  return `/post-details/${notification.postID}`
}

function getNotificationIcon(notification: Notification) {
  if (notification.isPostVerify) {
    return <ListAlt />
  }
  if (notification.qaID) {
    return <Chat />
  }
  return <ContactSupport />
}

export default function Notification() {
  const popupState = usePopupState({
    popupId: 'notificationList',
    variant: 'popover',
  })
  const { data, fetch } = useAxios<Notification[]>({
    config: {
      method: 'get',
      route: 'notification',
    },
    fetchOnMount: true,
  })
  const history = useHistory()
  const { fetch: markRead } = useAxios<string>({
    config: {
      method: 'put',
      route: 'notification/read',
    },
  })

  return (
    <div style={{ display: 'flex' }} {...bindHover(popupState)}>
      <Badge
        badgeContent={data && data.filter(n => !n.read).length}
        color="secondary"
      >
        <Notifications fontSize="large" />
      </Badge>
      <HoverMenu
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        style={{ height: 600 }}
        transformOrigin={{
          horizontal: 'right',
          vertical: theme.spacing(-0.5),
        }}
        {...bindMenu(popupState)}
      >
        <List component="nav" style={{ width: 400 }}>
          {!data?.length && (
            <Box
              alignItems="center"
              display="flex"
              justifyContent="center"
              minHeight={100}
            >
              <Typography>Bạn không có thông báo nào</Typography>
            </Box>
          )}

          {data &&
            data.map(item => (
              <ListItem
                button
                key={item._id}
                onClick={() => {
                  !item.read &&
                    markRead({ data: { ids: [item._id] } }).then(() => fetch())
                  history.push(getNotificationLink(item))
                }}
              >
                <ListItemAvatar>
                  <Badge
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    color="secondary"
                    invisible={item.read}
                    variant="dot"
                  >
                    <Avatar>{getNotificationIcon(item)}</Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={item.message}
                  secondary={epochToString(item.createdAt)}
                />
              </ListItem>
            ))}
        </List>
      </HoverMenu>
    </div>
  )
}
