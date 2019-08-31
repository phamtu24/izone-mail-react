import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Mail from './mail';
import DataContext from '../../contexts/data_context';
import { Route } from 'react-router-dom';
import api from '../../api';

export default ({ match }) => {
    let [messages, setMessage] = useState([]);
    let [mount, setMount] = useState(true)
    let url = `${api}/m/${match.params.id}`

    useEffect(() => {
        setMount(true)
        axios({
            method: 'GET',
            url: url,
            headers: { 'Authorization' : localStorage.getItem('token')}
        })
            .then(res => {
                setMessage(res.data)
            });

        return (() => { setMount(false)})
    }, [match.params])
    return (
        <>
            {
                messages.length > 0 &&
                messages.map(mess => <Mail Mail={mess} />)
            }
            {
                messages.length === 0 &&
                <img className="indicator" style={{ "width": "15rem" }}
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
            }
        </>
    );
}
