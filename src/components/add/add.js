import React, { useState } from 'react';
import DataContext from '../../contexts/data_context';
import storage from '../../firebase';
import axios from 'axios';
import api from '../../api';
import {
    Container, Form, Row,
    Col, Button,
     ProgressBar, Alert
} from 'react-bootstrap';
const url = `${api}/add`;
const postData = async (mail, imageUrl, setMail, setImageUrl, setProgress) => {
    try {
        await axios({
            method: "POST",
            url: url,
            headers: { 'Authorization' : localStorage.getItem('token') || 
                                         sessionStorage.getItem('token')},
            data: {
                "name": mail.name,
                "title": mail.title,
                "mail": mail.message,
                "date": mail.date,
                "transMail": mail.transMessage,
                "images": imageUrl
            },
            transformResponse: [(data) => {
                alert('Added successfully!');
                setMail({
                    name: "Miyawaki Sakura",
                    title: "",
                    message: "",
                    date: "",
                    transMessage: ""
                });
                setImageUrl([]);
                setProgress(0);
            }],
            timeout: 10000
        })
    } catch(error) {
        alert(error)
    }
}

export default () => {
    const [mail, setMail] = useState({
        name: "Miyawaki Sakura",
        title: "",
        message: "",
        date: "",
        transMessage: ""
    });
    const [imageUrl, setImageUrl] = useState([]);
    const [progress, setProgress] = useState(0);
    const handleChangeFile = async (event) => {
        if (!event.target.files) { return }
        let imgs = [];
        for (let file of event.target.files) {
            let img = await handleUpload(file);
            imgs.push(img) 
        }
        setImageUrl(imgs)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMail({ ...mail, [name]: value })
    }

    const handleUpload = (imageFile) => {
        return new Promise( (resolve, reject) => {
        const uploadTask = storage.ref(`Private Mails/${imageFile.name}`);
        uploadTask.put(imageFile).on('state_changed',
            (snapshot) => {
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                setProgress(percentage);
            },
            (error) => {
                reject(error)
            },
            () => {
                // complete
                uploadTask.getDownloadURL().then(url => {
                    resolve(url)
                })
            })
        })
    }

    return (
        <Container>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Select member
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="select"
                            name="name"
                            value={mail.name}
                            onChange={handleChange}>
                            <DataContext.Consumer>
                                {({ members }) => members.map(mem =>
                                    <option
                                        value={mem.name}
                                    >{mem.name}</option>)}
                            </DataContext.Consumer>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Title
                </Form.Label>
                    <Col sm="10">
                        <Form.Control as="input"
                            name="title"
                            type="text"
                            value={mail.title}
                            onChange={handleChange}
                            placeholder="Title..." />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Date
                </Form.Label>
                    <Col sm="10">
                        <Form.Control as="input"
                            name="date"
                            value={mail.date}
                            onChange={handleChange}
                            type="datetime-local" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Message
                </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" rows="3"
                            name="message"
                            value={mail.message}
                            onChange={handleChange}
                            type="text" placeholder="Message..." />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Trans message
                </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" rows="3"
                            name="transMessage"
                            value={mail.transMessage}
                            onChange={handleChange}
                            type="text" placeholder="Translated message..." />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Photos
                </Form.Label>

                    <Col sm="10">

                        <Form.Control as="input"
                            type="file" multiple
                            style={{ "margin-bottom": "1rem" }}
                            onChange={handleChangeFile} />
                        <ProgressBar animated now={progress} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm="10">
                        <Button variant="outline-dark"
                            onClick={() => {
                                postData(mail, imageUrl, setMail, setImageUrl, setProgress)
                                // window.location.reload()
                            }}
                        >Submit</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>

    )
}