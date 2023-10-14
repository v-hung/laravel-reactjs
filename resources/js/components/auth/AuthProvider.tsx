import useUserStore from "../../stores/user";
import { Navigate, Outlet } from "react-router-dom";

const AuthProvider = () => {
  const user = useUserStore(state => state.user)

  if (!user) {
    return <Navigate to={"/auth/login"} />
  }

  return <Outlet />
}

export default AuthProvider