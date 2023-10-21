import { Navigate, createBrowserRouter } from "react-router-dom"
import MainLayout from "./components/layouts/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import { Suspense, lazy } from "react";
import AuthProvider from "./components/auth/AuthProvider";
import useUserStore from "./stores/user";

const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const StudyPage = lazy(() => import("./pages/StudyPage"))
const StudyDetailsPage = lazy(() => import("./pages/StudyDetailsPage"))
const TestPage = lazy(() => import("./pages/TestPage"))
const SubmitPage = lazy(() => import("./pages/SubmitPage"))

const Loading = () => (<div className="text-sm p-2 text-center">Đang tải ...</div>)

const router = createBrowserRouter([
  {
    loader: async () => {
      await useUserStore.getState().logged()
      return null
    },
    errorElement: <ErrorPage />,
    children: [
      {
        // router authentication
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
                element: <StudyPage />
              },
              {
                path: '/exam/:code',
                element: <Suspense fallback={<Loading />}>
                  <StudyDetailsPage />
                </Suspense>
              },
              {
                path: '/submit-test/:id',
                element: <Suspense fallback={<Loading />}>
                  <SubmitPage />
                </Suspense>
              },
              {
                path: '/exercise',
                element: <Suspense fallback={<Loading />}>
                  <div>fasdf</div>
                </Suspense>
              },
            ]
          },

          {
            path: '/test/:code',
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
      },
      {
        path: '/auth/register',
        element: <Suspense fallback={<Loading />}>
          <RegisterPage />
        </Suspense>
      }
    ]
  },
]);

export default router