import { Navigate, Outlet, createBrowserRouter } from "react-router-dom"
import MainLayout from "./components/layouts/MainLayout";
import NotAuthLayout from "./components/layouts/NotAuthLayout";
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
const ClassPage = lazy(() => import("./pages/ClassPage"))
const AnswerTestPage = lazy(() => import("./pages/AnswerTestPage"))

const PostPage = lazy(() => import("./pages/PostPage"))
const PostDetailPage = lazy(() => import("./pages/PostDetailPage"))

const Loading = () => (<div className="text-sm p-2 text-center">Đang tải ...</div>)

const router = createBrowserRouter([
    {
        loader: async () => {
            await useUserStore.getState().logged()
            return null
        },
        errorElement: <ErrorPage />,
        element: <Outlet />,
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
                                element: <Navigate to={'/posts'} />
                            },

                            {
                                path: '/exam',
                                element: <Suspense fallback={<Loading />}>
                                    <StudyPage />
                                </Suspense>
                            },
                            {
                                path: '/exam/:code',
                                element: <Suspense fallback={<Loading />}>
                                    <StudyDetailsPage />
                                </Suspense>
                            },
                            {
                                path: '/submit-test/:code/:id',
                                element: <Suspense fallback={<Loading />}>
                                    <SubmitPage />
                                </Suspense>
                            },
                            {
                                path: '/answer-test/:code/:id',
                                element: <Suspense fallback={<Loading />}>
                                    <AnswerTestPage />
                                </Suspense>
                            },
                            {
                                path: '/class',
                                element: <Suspense fallback={<Loading />}>
                                    <ClassPage />
                                </Suspense>
                            },
                            {
                                path: '/posts',
                                element: <Suspense fallback={<Loading />}>
                                    <PostPage />
                                </Suspense>
                            },
                            {
                                path: '/posts/:id',
                                element: <Suspense fallback={<Loading />}>
                                    <PostDetailPage />
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
                path: '/auth',
                element: <NotAuthLayout />,
                children: [
                    {
                        path: 'login',
                        element: <Suspense fallback={<Loading />}>
                            <LoginPage />
                        </Suspense>
                    },
                    {
                        path: 'register',
                        element: <Suspense fallback={<Loading />}>
                            <RegisterPage />
                        </Suspense>
                    }
                ]
            },
        ]
    },
]);

export default router