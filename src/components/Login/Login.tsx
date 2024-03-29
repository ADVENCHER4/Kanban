import React, {FC, useState} from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {IUser} from "../../types";
import {emptyUser} from "../../utils/constants";
import {useAuth} from "../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import ErrorSpan from "../UI/ErrorSpan/ErrorSpan";

const Login: FC = () => {
    const [err, setErr] = useState<string>('')
    const [user, setUser] = useState<IUser>(emptyUser)
    const [pass, setPass] = useState<string>('')
    const {signIn} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.state?.from?.pathname || '/';
    const signInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await signIn(user, pass)
            navigate(path);
        } catch (e: any) {
            setErr('Something went wrong')
        }
    }
    return (
        <form onSubmit={signInHandler} className='user-form'>
            <Input type='email' placeholder='Эл. почта' value={user.email}
                   onChange={(e) => setUser({...user, email: e.target.value})}/>
            <Input type='password' placeholder={'Пароль'} value={pass}
                   onChange={(e) => setPass(e.target.value)}/>
            <Button type='submit'>Sign in</Button>
            <ErrorSpan>{err}</ErrorSpan>
        </form>
    );
};

export default Login;