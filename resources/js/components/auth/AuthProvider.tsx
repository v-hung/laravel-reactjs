import useUserStore from "../../stores/user";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthProvider = () => {
  const user = useUserStore(state => state.user)
  const { pathname } = useLocation()

  if (!user) {
    return <Navigate to={`/auth/login${pathname != '/' ? `?redirect_url=${pathname}` : ''}`} />
  }

  return <Outlet />
}

export default AuthProvider