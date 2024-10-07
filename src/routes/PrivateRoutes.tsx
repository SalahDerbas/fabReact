import { Route, Redirect } from "react-router-dom"
import { RootState } from "../core/redux/store"
import { useSelector } from "react-redux"

export const PrivateRoute: React.FC<{}> = ({ children, ...rest }) => {
  /*------------------------------|| HOOKS ||------------------------------------------------*/
  const { user } = useSelector((state: RootState) => state.Authentication)

  /*------------------------------|| RENDER ||------------------------------------------------*/
  return (
    <Route
      {...rest}
      render={() => {
        return user?.accessToken ? children : <Redirect to="/login" />
      }}
    />
  )
}
