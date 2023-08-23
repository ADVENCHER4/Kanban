import React, {FC, useState} from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {IUser} from "../../types";
import {emptyUser} from "../../utils/constants";
import {useAuth} from "../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";

const Register: FC = () => {
    const [userData, setUserData] = useState<IUser>(emptyUser)
    const [pass, setPass] = useState<string>('')
    const {signUp} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.state?.from?.pathname || '/';
    const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await signUp(userData, pass);
        navigate(path);
    }
    return (
        <form onSubmit={signUpHandler}>
            <Input type='text' placeholder='Name' value={userData.name}
                   onChange={(e) => setUserData({...userData, name: e.target.value})}/>
            <Input type='email' placeholder='Email' value={userData.email}
                   onChange={(e) => setUserData({...userData, email: e.target.value})}/>
            <Input type='password' placeholder='Password' value={pass}
                   onChange={(e) => setPass(e.target.value)}/>
            <Button>Register</Button>
        </form>
    );
};

export default Register;