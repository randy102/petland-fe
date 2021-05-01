import { Box, MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'

type Props = {
  to: string
  onClick: () => void
  Icon: React.ReactNode
  text: string
}

export default function MenuLink(props: Props) {
  const { to, onClick, Icon, text } = props
  return (
    <MenuItem component={Link} to={to} onClick={onClick}>
      <Box alignItems="center" display="flex">
        {Icon}
        <Box ml={1.25}>{text}</Box>
      </Box>
    </MenuItem>
  )
}
