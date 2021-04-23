import { Box, Icon, MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'

type Props = {
  to: string
  onClick: () => void
  icon: string
  text: string
}

export default function MenuLink(props: Props) {
  const { to, onClick, icon, text } = props
  return (
    <MenuItem component={Link} to={to} onClick={onClick}>
      <Box alignItems="center" display="flex">
        <Icon>{icon}</Icon>
        <Box ml={1.25}>{text}</Box>
      </Box>
    </MenuItem>
  )
}
