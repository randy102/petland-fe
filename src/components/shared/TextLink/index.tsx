import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'

type Props = MuiLinkProps &
  Omit<RouterLinkProps, 'to'> & {
    to?: RouterLinkProps['to']
  }

export default function TextLink(props: Props) {
  const { component = RouterLink, variant = 'body1', to = '#', ...rest } = props

  return (
    <MuiLink component={component} to={to} variant={variant} {...rest}>
      {props.children}
    </MuiLink>
  )
}
