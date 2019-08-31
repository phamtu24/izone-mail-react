import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import api from '../../api';

const login = async (username, password) => {
    const res = await axios({
        method:'POST',
        url: `${api}/login`,
        data: {
            username: username,
            password: password
        }
    })
    localStorage.setItem('token', res.data.token)
    window.location.href = "/"
    
}

export default (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text"
                    name="username" 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username" />
                    <Form.Text className="text-muted">
                        Subcribe to Official IZ*ONE Private Mail !
                </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" 
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password" />
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button variant="outline-dark"
                onClick={() => login(username, password)}>
                    Submit
            </Button>
            </Form>
        </Container>

    )


}