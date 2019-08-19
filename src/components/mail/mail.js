import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './mail.css'

export default class Navigation extends Component {
    render() {
        const { Mail } = this.props;
        return (
            <Container>
                <Link to={"mail/" + Mail.messageID}>
                <div className="wrapper">
                    <div className="overlayer">
                        <img className="avatar" src={Mail.Member.avatar} />
                    </div>
                    <div className="info">
                        <div className="name-title-mail">
                            <div className="name">{Mail.Member.name}</div>
                            <div className="title">{Mail.title}</div>
                            <div className="mail">{Mail.mail}</div>
                        </div>
                        <div className="date">{Mail.date}</div>
                    </div>
                </div>
                </Link>
            </Container>
        );
    };
};