import { useMediaQuery, useTheme } from '@material-ui/core'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

export default function useIsBreakpoint(breakpoint: Breakpoint) {
  const theme = useTheme()
  const isBreakpoint = useMediaQuery(theme.breakpoints.down(breakpoint))

  return isBreakpoint
}
