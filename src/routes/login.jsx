import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Redirect after successful login
    const { get_user } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page refresh

        try {
            const response = await get_user(username, password);

            if (!response || response.error) {
                setError("Invalid username or password"); // Set error message
            } else {
                setError(""); // Clear any previous error
                navigate("/"); // Redirect to dashboard or home page
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <Container className="mt-5">
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleLogin}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>

                <Button variant="primary" className="mt-3" type="submit">
                    Login
                </Button>
            </Form>

            <p className="mt-3">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </Container>
    );
};

export default Login;
