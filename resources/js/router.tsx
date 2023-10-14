import { Navigate, createBrowserRouter } from "react-router-dom"
import MainLayout from "./components/layouts/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { Suspense, lazy } from "react";
import AuthProvider from "./components/auth/AuthProvider";
import useUserStore from "./stores/user";

const LoginPage = lazy(() => import("./pages/LoginPage"))
const StudyPage = lazy(() => import("./pages/StudyPage"))
const StudyDetailsPage = lazy(() => import("./pages/StudyDetailsPage"))
const TestPage = lazy(() => import("./pages/TestPage"))

const Loading = () => (<div className="text-sm p-2 text-center">Đang tải ...</div>)

const router = createBrowserRouter([
  // router authentication
  {
    loader: async () => {
      await useUserStore.getState().logged()
      return null
    },
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthProvider />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                path: '/',
                element: <Navigate to={'/exam'} />
              },
              {
                path: '/exam',
                element: <HomePage />
              },
              {
                path: '/exercise',
                element: <Suspense fallback={<Loading />}>
                  <StudyPage />
                </Suspense>
              },
              {
                path: '/exam/:id',
                element: <Suspense fallback={<Loading />}>
                  <StudyDetailsPage />
                </Suspense>
              },
            ]
          },

          {
            path: '/test/:id',
            element: <Suspense fallback={<Loading />}>
              <TestPage />
            </Suspense>
          }
          
        ],
      },

      // not authentication
      {
        path: '/auth/login',
        element: <Suspense fallback={<Loading />}>
          <LoginPage />
        </Suspense>
      }
    ]
  },
]);

export default router