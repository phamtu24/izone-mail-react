import React, { useState, useEffect } from 'react';
import DataContext from '../../../contexts/data_context';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import './photo_route.css';
import Album from './album';
import downloadIcon from '../../../icon/download.png';
import mailIcon from '../../../icon/envelope.png';

export default (props) => {
    const { match: { params } } = props;
    switch (params.id) {
        case 'album':
            return <Album />
            break;
        case 'all-photos':
            return <PhotoRoute url={"http://localhost:5000/photos/all-photos"}/>
            break;
        default:
            return <PhotoRoute url={"http://localhost:5000/photos/" + params.id}/>
    }
}

const PhotoRoute = (props) => {
    const { url } = props;
    const [imageList, setImage] = useState([]);
    const [show, setShow] = useState(false);
    const [obj, setObj] = useState("");
    const handleClick = (event) => {
        setShow(true);
        let a = event.target.id.split(',');
        console.log(a[1])
        setObj({
            url: a[0],
            messageID: a[1]
        })

    }

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setImage(res.data)
            });
    }, [])

    if (imageList) {
        return (
            <Container>
                <Row>
                    <Col sm>
                        {imageList.map(ele =>
                            <>
                                <b className="date">
                                    {ele.date}
                                </b>
                                {ele.images.map(image =>
                                    <div className="photos"
                                        onClick={handleClick}
                                        style={{ "background-image": "url(" + image.url + ")" }}
                                        id={image.url+','+image.messageID}
                                    >
                                    </div>
                                )}
                            </>
                        )}
                    </Col>
                </Row>
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-90w"
                    centered
                >
                    <Modal.Body>
                        <div className="wrap">
                            <img className="modal-image" src={obj.url} />
                            <div className="middle">
                                <Link to={"/mail/" + obj.messageID}>
                                    <span className="icon1">
                                        <img className="img1" src={mailIcon} />
                                    </span>
                                </Link>
                                <a href={obj.url}>
                                    <span className="icon2">
                                        <img className="img2" src={downloadIcon} />
                                    </span>
                                </a>

                            </div>
                        </div>

                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}
