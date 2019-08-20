import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DataContext from '../../../contexts/data_context';
import './all_photos.css'

const getDates = (messages) => {
    let dates = [];
    for (let mess of messages) {
        let date = mess.date;
        date = date.split('').splice(6).join('');
        if (dates.indexOf(date) === -1) {
            dates.push(date)
        }
    };
    return dates;
}

const photosInDate = (messages, date) => {
    let photos = [];
    for (let mess of messages) {
        if (mess.date.indexOf(date) !== -1) {
            for (let image of mess.Image) {
                photos.push(image.url)
            }
        }
    }
    return photos;
}

const dateToString = (date) => {
    let dateFormat = new Date(date);
    let dateString = dateFormat.toDateString();
    return dateString;
}

export default () => {
    return (
        <DataContext.Consumer>
            {({ messages }) =>
            <div>
            { messages.length > 0 && 
                <Container>
                    <Row>
                        <Col sm>
                            <div>
                                {getDates(messages).map(date => 
                                    <div>
                                    <b className="date">
                                        {dateToString(date)}
                                    </b>
                                        {photosInDate(messages, date).map(url => 
                                            <div className="photos"
                                            style={{"background-image": "url(" + url +")"}}
                                            ></div>
                                            )}
                                    </div>
                                    )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            }
            </div>   
        }
        </DataContext.Consumer>
    )
}