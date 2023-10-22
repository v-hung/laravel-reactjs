import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LeftSide from "./LeftSide";
import { Suspense, lazy } from "react";

const JoinClassModal = lazy(() => import("../modal/JoinClassModal"))

const MainLayout = () => {
  return (
    <>
      <div className="w-full h-full flex p-4 bg-blue-800">
        <LeftSide className="flex-none" />
      
        <div className="flex-grow h-full flex flex-col bg-gray-50 rounded-3xl px-6">
          <Header className="flex-none" />
          <div className="flex-grow minh-0 py-4 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>

      <Suspense fallback={<p className="p-2 text-center">Đang tải...</p>}>
        <JoinClassModal/>
      </Suspense>
    </>
  )
}

export default MainLayout