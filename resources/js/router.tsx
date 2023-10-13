import { createBrowserRouter } from "react-router-dom"
import MainLayout from "./components/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <HomePage />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]);

export default router