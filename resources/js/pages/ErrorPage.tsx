import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="w-full h-screen bg-gradient-to-t from-white to-red-300 py-12 md:py-20 lg:py-28">
      <div className="w-full max-w-xl mx-auto p-8 rounded-md bg-white shadow flex flex-col  space-y-3 items-center">
        <h1 className="text-2xl font-semibold text-red-600">Oh không!</h1>
        <p>Trang bạn đang tìm không tồn tại.</p>
        <Link to="/" className="text-blue-500 hover:underline" >Về trang chủ</Link>
      </div>
    </div>
  )
}

export default ErrorPage