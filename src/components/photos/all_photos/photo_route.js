import React, { useState, useEffect } from 'react';
import DataContext from '../../../contexts/data_context';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../../../api';
import Album from './album';
import downloadIcon from '../../../icon/download.png';
import mailIcon from '../../../icon/envelope.png';
import LazyLoad from './lazy_load';
import './photo_route.css';

export default (props) => {
    const { match: { params } } = props;
    switch (params.id) {
        case 'album':
            return <Album />
            break;
        case 'all-photos':
            return <PhotoRoute url={`${api}/photos/all-photos`} params={params}/>
            break;
        default:
            return <PhotoRoute url={`${api}/photos/` + params.id} params={params}/>
    }
}

const PhotoRoute = (props) => {
    const { url, params } = props;
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
        axios({
            method: 'GET',
            url: url,
            headers: { 'Authorization' : localStorage.getItem('token')}
        })
            .then(res => {
                setImage(res.data)
            });
    }, [params])

    if (imageList) {
        return (
            <Container>
                
                        {imageList.map(ele =>
                            <>
                                <b className="date">
                                    {ele.date}
                                </b>
                                <Row>
                                   
                                    {ele.images.map(image =>
                                     <Col xs={6} md={3}>
                                    <LazyLoad handleClick={handleClick} image={image}/>
                                    </Col>
                                )}
                                    
                                </Row>
                            </>
                        )}
                    
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
