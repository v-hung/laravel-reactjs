import { Outlet, Navigate, useSearchParams } from 'react-router-dom'
import useUserStore from "../../stores/user";

const NotAuthLayout = () => {
  const { user } = useUserStore()
  const [ searchParams, setSearchParams ] = useSearchParams()

  if (user) {
    return <Navigate to={searchParams.get('redirect_url') || '/'} />
  }

  return (
    <div className="w-full min-h-full px-6 py-8 md:py-16 lg:py-20 bg-slate-100">
      <div className="w-full max-w-[500px] mx-auto bg-white rounded-lg p-6 shadow">
        <Outlet />
      </div>
    </div>
  )
}

export default NotAuthLayout