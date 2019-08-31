import React, { useState } from 'react';
import {
    Container, Form,
    Button, Alert
} from 'react-bootstrap';
import axios from 'axios';
import api from '../../api';

const login = async (username, password,remember , setError) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${api}/login`,
            data: {
                username: username,
                password: password
            }
        })
        remember ?  
        localStorage.setItem('token', res.data.token) : 
        sessionStorage.setItem('token', res.data.token)
        window.location.href = "/"
    } catch (err) {
        if (err) {
            setError(err.response.data)
        }
    }


}

export default (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [remember, setRemember] = useState(false);

    const handleChange = (e)  => {
        e.target.checked ? 
        setRemember(true) : 
        setRemember(false)
    }

    return (
        <Container>
            <Form>
                {error && <Alert variant='danger'>{error}</Alert>}
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
                    <Form.Check type="checkbox" label="Remember me"
                    onChange={handleChange} />
                </Form.Group>
                <Button variant="outline-dark"
                    onClick={() => login(username, password, remember, setError)}>
                    Submit
            </Button>
            </Form>
        </Container>

    )


}