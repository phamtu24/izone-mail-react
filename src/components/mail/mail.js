import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DataContext from '../../contexts/data_context';
import './mail.css'

export default (props) => {
    const { Mail } = props;
    return (
        <DataContext.Consumer>
            {({ members }) =>
                <>
                    {
                        members.length > 0 &&
                        <Navigation members={members} Mail={Mail} />
                    }
                </>
            }
        </DataContext.Consumer>
    )
}

const Navigation = (props) => {
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const { members, Mail } = props;

    useEffect(() => {
        const member = members.find(mem => mem._id == Mail.memberID);
        setName(member.name);
        setAvatar(member.avatar);
    })

    return (
        <Container>
            <Link to={"mail/" + Mail._id}>
                <div className="wrapper">
                    <div className="overlayer">
                        <img className="avatar" src={avatar} />
                    </div>
                    <div className="info">
                        <div className="name-title-mail">
                            <div className="name">{name}</div>
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