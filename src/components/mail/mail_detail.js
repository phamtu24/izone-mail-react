import React, { useState, useEffect } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import './mail_detail.css';

export default (props) => {
    const { match: { params } } = props;
    const [mail, switchMail] = useState({ mailContent: "", switched: false });
    const [member, setMember] = useState({});
    const [message, setMessage] = useState({});
    const [show, setShow] = useState(false);
    const [trans, setTrans] = useState("");
    const url = `https://izone-mail.herokuapp.com/mail/${params.id}`;
    
    const updateTrans = async (trans) => {
        await axios({
            method: "POST",
            url: url,
            data: {
                "message": [
                    {
                        "_id": message._id,
                        "transMail": trans
                    }
                    ]
            }
        })
    }

    const handleChange = (event) => {
        setTrans(event.target.value)
    }

    useEffect(() => {
        // do not use async await ?
        axios.get(url)
            .then(({ data }) => {
                setMember(data.member[0]);
                setMessage(data.message[0]);
            })

    }, [])
    return (
        <Container>
            <div className="header">
                <div className="overlayer">
                    <img className="avatar" src={member.avatar} />
                </div>
                <div className="info">
                    <div className="from-to">
                        <div className="name">{member.name}</div>
                        <div className="user">To: You</div>
                    </div>
                    <div className="date">{message.date}</div>
                </div>
            </div>
            <div className="header">
                <div className="title">{message.title}</div>
                <Button variant="outline-dark"
                    style={{ "font-size": "0.8rem" }}
                    onClick={() => {
                        if (!mail.switched) {
                            switchMail({ mailContent: message.transMail, switched: true })
                        } else {
                            switchMail({ mailContent: message.mail, switched: false })
                        }
                    }}
                >dịch</Button>
            </div>
            <div className="mail-detail">
                {!mail.mailContent && <pre className="pre" id="pre">{message.mail}</pre>}
                {mail.mailContent && <pre className="pre" id="pre">{mail.mailContent}</pre>}
                {mail.mailContent == "Coming soon ..." &&
                    <button className="trans-button" onClick={() => setShow(true)} >translate this mail</button>
                }
                {message.images &&
                    message.images.map(img =>
                        <div>
                            <p></p>
                            <img src={img} className="avatar" />
                        </div>
                    )}
            </div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                centered
            >
                <Modal.Header closeButton>
                    <button onClick={() => {
                        updateTrans(trans);
                        window.location.reload();
                        }}>Submit</button>
                </Modal.Header>
                <Modal.Body className="custom-body">
                    <textarea onChange={handleChange} placeholder="Enter translation ..."></textarea>
                </Modal.Body>
            </Modal>

        </Container>
    );
}

