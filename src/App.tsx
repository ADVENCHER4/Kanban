import React, {FC, useState} from 'react';
import './styles/App.css'
import AppRouter from "./components/AppRouter/AppRouter";
import {getAuth} from "firebase/auth";
import {useAppDispatch} from "./hooks/reduxHooks";
import {setUser} from "./store/Slices/userSlice";
import Loader from "./components/UI/Loader/Loader";
import Container from "./components/Container/Container";

const App: FC = () => {
    const [isPendingAuth, setPendingAuth] = useState<boolean>(true)
    const dispatch = useAppDispatch()

    getAuth().onAuthStateChanged((user) => {
        if (user) {
            dispatch(setUser(
                {
                    name: user?.displayName!,
                    email: user?.email!,
                    id: user.uid
                }
            ))
        }
        setPendingAuth(false)
    })
    return (
        <>
            {
                isPendingAuth ?
                    <Container>
                        <Loader/>
                    </Container>
                    : <AppRouter/>
            }
        </>
    );
};

export default App;