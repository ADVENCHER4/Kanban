import React, {FC} from 'react';
import Container from "../components/Container/Container";
import {Link} from "react-router-dom";
import Register from "../components/Register/Register";

const RegisterPage: FC = () => {

    return (
        <Container>
            <h2>Register</h2>
            <Register/>
            <span>Already have an account? <Link to='/login'>Sing in</Link></span>
        </Container>
    );
}

export default RegisterPage;