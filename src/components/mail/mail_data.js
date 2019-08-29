import React, { useState, useEffect, useRef } from 'react';
import Mail from './mail';
import DataContext from '../../contexts/data_context';
import { Pagination, Container } from 'react-bootstrap';
import './mail_data.css'

export default () => {
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(0);
    const pageValue = useRef(null);
    const perPage = 20;
    const start = (page-1)*perPage
    const end = page*perPage
    

    const renderMessage = (mes) => {
        let messagePerPage = mes;
        return messagePerPage.slice(start, end)
    }

    useEffect(() => {
        pageValue.current.value = page
    })
     
    return (
        <DataContext.Consumer>
            {({messages}) =>
                <> 
                    {
                        messages.length > 0 &&
                         renderMessage(messages).map(mess => <Mail Mail={mess} />)
                    }
                    {
                        setPageNumber(Math.ceil(messages.length / perPage))
                    }
                    
                    {
                        messages.length === 0 &&
                        <img className="indicator" width="15rem"
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
                    }
                    <Container>
                        <Pagination className="custom-pagination">
                            <div className="custom-text">Page</div>
                            <input className="page-number"
                            ref={pageValue} 
                            onKeyUp={(e) => {
                                if (e.keyCode === 13) {
                                    const value = e.target.value;
                                    if (!/[0-9]/g.test(value)) { return }
                                    if (value < 1 || value > pageNumber) { return }
                                    setPage(value)
                                }
                            }}/>
                            <div className="custom-text">of {pageNumber}</div>
                            <Pagination.Prev onClick={() => {
                                if (page <= 1 ) { return }
                                setPage(page-1)
                            }}/>
                            <Pagination.Next onClick={() => {
                                if (page === pageNumber) { return }
                                setPage(page+1)
                            }}/>
                        </Pagination>
                    </Container>
                </>
            }
        </DataContext.Consumer>

    );
};