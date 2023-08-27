import React, {FC} from 'react';
import Container from "../components/Container/Container";
import Login from "../components/Login/Login";
import LinkButton from "../components/UI/LinkButton/LinkButton";

const LoginPage: FC = () => {
    return (
        <Container>
            <h2>Sign in</h2>
            <Login/>
            <span>Haven't account? <LinkButton to='/register'>Register</LinkButton></span>
        </Container>
    );
}

export default LoginPage;