import { Link as MuiLink } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

type Props = {
  to?: string
  onClick?: () => void
  children: React.ReactNode
}

export default function TextLink(props: Props) {
  return (
    <MuiLink
      component={RouterLink}
      to={props.to || '#'}
      onClick={props.onClick}
    >
      {props.children}
    </MuiLink>
  )
}
