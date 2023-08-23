import React, {FC} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useIsAuth} from "../../hooks/useIsAuth";

const ProtectedRoute: FC<React.PropsWithChildren> = ({children}) => {
    const {isAuth} = useIsAuth()
    const location = useLocation()
    if (!isAuth) {
        return (
            <Navigate to={'/login'} state={{from: location}}/>
        )
    }
    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;