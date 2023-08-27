import React from 'react';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import BoardPage from "../../pages/BoardPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import BoardsPage from "../../pages/BoardsPage";
import RootPage from "../../pages/RootPage";
import ErrorPage from "../../pages/ErrorPage";

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootPage/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: '/',
                    element: <Navigate to='/boards'/>,
                },
                {
                    path: '/boards',
                    element: <ProtectedRoute><BoardsPage/></ProtectedRoute>,
                },
                {
                    path: '/boards/:id',
                    element: <ProtectedRoute><BoardPage/></ProtectedRoute>,
                },
                {
                    path: '/login',
                    element: <LoginPage/>,
                },
                {
                    path: '/register',
                    element: <RegisterPage/>
                }
            ]
        }
    ])
    return (
        <RouterProvider router={router}/>
    );
};

export default AppRouter;