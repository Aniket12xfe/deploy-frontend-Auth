import React, { useState } from 'react';
import { Form, Button, Container, Alert } from "react-bootstrap";   
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { get_register } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await get_register(username, password, cpassword, email, firstname, lastname);
            
            if (response) {
                navigate("/login");
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
        catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <Container className="mt-5">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleRegister}>
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

                <Form.Group controlId="cpassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={cpassword}
                        onChange={(e) => setCpassword(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <input
                        type="text"
                        placeholder="Enter First Name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <input
                        type="text"
                        placeholder="Enter Last Name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="form-control"
                    />
                </Form.Group>

                <Button variant="primary" className="mt-3" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    )
}

export default Register;