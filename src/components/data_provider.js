import React, { Component } from 'react';
import axios from 'axios';
import DataContext from '../contexts/data_context';


export default class extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            members: []
        }
    }

    componentDidMount() {
        const { messages, members } = this.state
        axios.get(`https://izone-mail.web.app/api`)
        .then(res => {
            this.setState({
                messages: messages.concat(res.data)
            })
        });

        axios.get(`https://izone-mail.web.app/api/members`)
        .then(res => {
            this.setState({ members: members.concat(res.data) });
        });
    }

    render() {
        const { messages, members } = this.state;
        return(
            <DataContext.Provider value={ {messages, members} }>
                {this.props.children}
            </DataContext.Provider>
        );
    };
};

