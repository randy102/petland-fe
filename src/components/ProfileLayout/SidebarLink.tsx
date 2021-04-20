import { Link as MuiLink } from '@material-ui/core'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import useStyles from './styles'

type Props = {
  to: string
  children: React.ReactNode
}

export default function SidebarLink(props: Props) {
  const location = useLocation()

  return (
    <MuiLink
      color={location.pathname === props.to ? 'primary' : 'inherit'}
      component={RouterLink}
      to={props.to}
      underline="none"
    >
      {props.children}
    </MuiLink>
  )
}
