import React from 'react';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import BoardPage from "../../pages/BoardPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <ProtectedRoute><Navigate to='/board'/></ProtectedRoute>,
        },
        // {
        //     path: '/boards',
        //     element: null,
        // },
        {
            path: '/board',
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
    ])
    return (
        <RouterProvider router={router}/>
    );
};

export default AppRouter;