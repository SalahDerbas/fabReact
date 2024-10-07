import React, { useEffect } from "react"
import { Layout } from "../containers/layout"
import { Router, Switch, Route, Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { GetUserAsync } from "src/core/redux"
import { RootState } from "../core/redux/store"
import { publicRoutes, adminsRoutes } from "src/constants/routes"
import { PrivateRoute } from "src/routes/PrivateRoutes"
import history from "src/utils/helpers/history"
import { useRoutesForAdmin } from "src/utils/hooks/use-routes-for-admin"
import { FLoadingData } from "src/components/f-loading-data"

interface props {}

export const Routes: React.FC<props> = () => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  const dispatch = useDispatch()
  const { user, authStatus } = useSelector((state: RootState) => state.Authentication)

  useEffect(() => {
    dispatch(GetUserAsync())
  }, [])

  //Get User information on start app
  const privateRoutesByAdminType = useRoutesForAdmin(user?.roles ?? [], adminsRoutes)

  /*------------------------------|| Render ||------------------------------------------------*/
  return (
    <FLoadingData status={authStatus} fullScreen>
      <Router history={history}>
        <Switch>
          {publicRoutes.map(({ path, component }) => (
            <Route key={path} path={path} component={component}>
              {user?.accessToken && <Redirect to="/" />}
            </Route>
          ))}
          <PrivateRoute>
            <Layout>
              <Switch>
                {privateRoutesByAdminType.map(({ path, component, exact }) => (
                  <Route key={path} path={path} exact={exact} component={component} />
                ))}
                <Route path="*" render={() => <Redirect to="/otherPages/accessDenied" />} />
              </Switch>
            </Layout>
          </PrivateRoute>
        </Switch>
      </Router>
    </FLoadingData>
  )
}
