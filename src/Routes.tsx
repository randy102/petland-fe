import { FC } from 'react'
import { Route, Switch } from 'react-router'
import ChangePassword from './pages/change-password'
import Home from './pages/home'
import MyPosts from './pages/my-posts'
import MyProfile from './pages/my-profile'
import ProtectedRoute from './ProtectedRoute'

type RouteType = {
  path: string
  component: FC
  protected?: boolean
}

const routes: RouteType[] = [
  {
    component: Home,
    path: '/',
  },
  {
    component: MyPosts,
    path: '/my-posts',
    protected: true
  },
  {
    component: MyProfile,
    path: '/my-profile',
    protected: true,
  },
  {
    component: ChangePassword,
    path: '/change-password',
    protected: true
  }
]

export default function Routes() {
  return (
    <Switch>
      {
        routes.map(route => route.protected 
          ? (
            <ProtectedRoute
              exact
              component={route.component}
              key={route.path}
              path={route.path}
            />
          ) : (
            <Route
              exact
              component={route.component}
              key={route.path}
              path={route.path}
            />
          ))
      }
    </Switch>
  )
}
