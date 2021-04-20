import { Redirect, Route, RouteProps } from 'react-router'

type Props = RouteProps

export default function ProtectedRoute(props: Props) {
  if (localStorage.getItem('token')) {
    return <Route {...props} />
  }

  return (
    <Redirect to="/" />
  )
}
