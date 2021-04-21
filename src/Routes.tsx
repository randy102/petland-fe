import { Route, Switch } from 'react-router'
import Home from './components/pages/Home'
import ProtectedRoute from './ProtectedRoute'
import MyAccount from './components/pages/MyAccount'

export default function Routes() {
  return (
    <Switch>
      <Route
        exact
        component={Home}
        path="/"
      />

      <ProtectedRoute
        component={MyAccount}
        path="/my-account"
      />
    </Switch>
  )
}
