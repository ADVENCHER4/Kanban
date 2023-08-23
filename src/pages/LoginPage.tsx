import React, {FC} from 'react';
import Container from "../components/Container/Container";
import {Link} from "react-router-dom";
import Login from "../components/Login/Login";

const LoginPage: FC = () => {
    return (
        <Container>
            <h2>Sign in</h2>
            <Login/>
            <span>Haven't account? <Link to='/register'>Register</Link></span>
        </Container>
    );
}

export default LoginPage;