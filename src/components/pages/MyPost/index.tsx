import { Route, Switch, useRouteMatch } from 'react-router'
import Create from './Create'
import Edit from './Edit'

export default function MyPost() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route component={Create} path={`${path}/create`} />

      <Route component={Edit} path={`${path}/edit/:id`} />
    </Switch>
  )
}
