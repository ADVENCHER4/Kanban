import React, {FC} from 'react';
import Container from "../components/Container/Container";
import Register from "../components/Register/Register";
import LinkButton from "../components/UI/LinkButton/LinkButton";

const RegisterPage: FC = () => {

    return (
        <Container>
            <h2>Register</h2>
            <Register/>
            <span>Already have an account? <LinkButton to='/login'>Sing in</LinkButton></span>
        </Container>
    );
}

export default RegisterPage;