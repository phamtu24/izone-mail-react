import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataContext from '../contexts/data_context';
import api from '../api';


export default (props) => {
     let isMounted = true;
    let url = `${api}`;
    let [messages, setMessage] = useState([]);
    let [members, setMember] = useState([]);

    useEffect(async () => {
        const res = await axios({
            method: 'GET',
            url: url,
            headers: { 'Authorization' : localStorage.getItem('token') || 
            sessionStorage.getItem('token')}
        });
        if (isMounted) {
            setMessage(res.data.messages);
            setMember(res.data.members);
        }
        return (() => isMounted = false)
    }, []);
    
    return (
        <DataContext.Provider value={{ messages, members }}>
            {props.children}
        </DataContext.Provider>
    );
};

