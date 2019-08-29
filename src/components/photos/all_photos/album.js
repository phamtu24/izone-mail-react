import React from 'react';
import DataContext from '../../../contexts/data_context';
import { Link } from 'react-router-dom';
import './album.css';
import { Container, Row, Col } from 'react-bootstrap';

const filterPhotos = (messages, mem) => {
    let messageList = messages.filter(mess => mess.memberID == mem._id)
    for (let i = 0; messageList[i].images; i++) {
        return messageList[i].images[i]
    }
}

export default () => {
    return (
        <DataContext.Consumer>
            {({ messages, members }) =>
                <>
                    {messages.length > 0 && members.length > 0 &&
                        <Container>
                            <Row>
                                {members.map(mem =>
                                    <Col xs={6} md={4}>
                                        <div className="album-photos"
                                            style={{
                                                "background-image": "url(" +
                                                    filterPhotos(messages, mem) + ")"
                                            }}
                                        >
                                            <Link to={"/photos/" + mem.name}>
                                                <div className="overlay">
                                                    <span>
                                                        {mem.name}
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                    </Col>

                                )}
                            </Row>
                            
                        </Container>
                    }
                </>
            }
        </DataContext.Consumer>
    )
};