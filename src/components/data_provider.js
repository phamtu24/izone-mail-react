import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataContext from '../contexts/data_context';


export default (props) => {
     let isMounted = true;
    let url = `http://localhost:5000/`;
    let [messages, setMessage] = useState([]);
    let [members, setMember] = useState([]);

    useEffect(async () => {
        const res = await axios.get(url);
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

