import React, {FC, useState} from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {IUser} from "../../types";
import {emptyUser} from "../../utils/constants";
import {useAuth} from "../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";

const Login: FC = () => {
    const [user, setUser] = useState<IUser>(emptyUser)
    const [pass, setPass] = useState<string>('')
    const {signIn} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.state?.from?.pathname || '/';
    const signInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await signIn(user, pass)
        navigate(path);
    }
    return (
        <form onSubmit={signInHandler}>
            <Input type='email' placeholder='Эл. почта' value={user.email}
                   onChange={(e) => setUser({...user, email: e.target.value})}/>
            <Input type='password' placeholder={'Пароль'} value={pass}
                   onChange={(e) => setPass(e.target.value)}/>
            <Button type='submit'>Sign in</Button>
        </form>
    );
};

export default Login;