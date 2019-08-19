import React, { Component } from 'react';
import Mail from './mail';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DataContext from '../../contexts/data_context';
import { Container, Button } from 'react-bootstrap';
import './mail_detail.css'



function RenderImage(messageFrom, messages) {
    let imagesElements = [];
    for (let image of messageFrom(messages).Image) {
        imagesElements.push(
            <div>
                <p></p>
                <img src={image.url} className="avatar" />
            </div>
        )
    }
    return(imagesElements)
}

function Child({ match }) {
    const messageFrom = (messages) => {
        return messages.find(mess => (mess.messageID) == match.params.id)    
    } 
    return (
      <DataContext.Consumer>
            { ({messages}) =>
            <div>
                {messages.length > 0 && 
                <div>
                    {console.log(match.params.id)}
                    <Container>
                        <div className="header">
                            <div className="overlayer">
                                <img className="avatar" src={messageFrom(messages).Member.avatar} />
                            </div>
                            <div className="info">
                                <div className="from-to">
                                    <div className="name">{messageFrom(messages).Member.name}</div>
                                    <div className="user">To: You</div>
                                </div>
                                <div className="date">{messageFrom(messages).date}</div>
                            </div>
                        </div>
                        <div className="header">
                            <div className="title">{messageFrom(messages).title}</div>
                            <Button variant="outline-dark" style={{"font-size": "0.8rem"}}>dịch</Button>
                        </div>
                        <div className="mail-detail">
                           <pre className="pre" id="pre">{messageFrom(messages).mail}</pre>
                           {RenderImage(messageFrom, messages)}
                        </div>
                    </Container>
                </div> }
                {messages.length === 0 && 
                    <img className="indicator" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
                }
            </div>
            }
      </DataContext.Consumer>
    );
  }

export default class MailDetail extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <Route path="/mail/:id" exact component={Child} />
        );
    };
};