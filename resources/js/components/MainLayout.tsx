import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="w-full min-h-full flex flex-col">
      <Header className="flex-none" />
      
      <div className="flex-grow flex items-stretch">
        <Outlet />
      </div>

      <Footer className="flex-none" />
    </div>
  )
}

export default MainLayout