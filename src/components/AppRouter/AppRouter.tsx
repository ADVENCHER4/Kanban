import React from 'react';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import BoardPage from "../../pages/BoardPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import BoardsPage from "../../pages/BoardsPage";

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <ProtectedRoute><Navigate to='/board'/></ProtectedRoute>,
        },
        {
            path: '/boards',
            element: <BoardsPage/>,
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
    ])
    return (
        <RouterProvider router={router}/>
    );
};

export default AppRouter;