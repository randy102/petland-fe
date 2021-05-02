import { Route, Switch } from 'react-router'
import Home from './components/pages/Home'
import ProtectedRoute from './ProtectedRoute'
import MyAccount from './components/pages/MyAccount'
import MyPost from './components/pages/MyPost'
import Point from './components/pages/Point'

export default function Routes() {
  return (
    <Switch>
      <Route exact component={Home} path="/" />

      <ProtectedRoute component={MyAccount} path="/my-account" />

      <ProtectedRoute component={MyPost} path="/my-post" />

      <ProtectedRoute component={Point} path="/point" />
    </Switch>
  )
}
