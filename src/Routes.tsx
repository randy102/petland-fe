import { Route, Switch } from 'react-router'
import Home from './components/pages/Home'
import ProtectedRoute from './ProtectedRoute'
import MyAccount from './components/pages/MyAccount'
import CreatePost from './components/pages/CreatePost'

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

      <ProtectedRoute
        component={CreatePost}
        path="/create-post"
      />
    </Switch>
  )
}
