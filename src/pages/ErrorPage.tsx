import React from 'react';
import Container from "../components/Container/Container";
import {useNavigate} from "react-router-dom";
import Button from "../components/UI/Button/Button";

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <h1>Something went wrong</h1>
            <Button onClick={() => navigate(-1)}>Go back</Button>
        </Container>
    );
};

export default ErrorPage;