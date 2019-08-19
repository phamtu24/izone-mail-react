import React, { Component } from 'react';
import Mail from './mail';
import DataContext from '../../contexts/data_context';
import { Route } from 'react-router-dom';

function Child({ match }) {
    const filter = (messages) => {
        let filterMessages = messages.filter(a => a.Member.name === match.params.id)
        return filterMessages
    }
    return (
        <DataContext.Consumer>
            {({ messages }) =>
                
                <div>
                    {messages.length > 0 &&
                        filter(messages).map(mess => <Mail Mail={mess} />)
                    }
                    {messages.length === 0 &&
                        <img className="indicator" style={{ "width": "15rem" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
                    }

                </div>}
        </DataContext.Consumer>
    );
}

export default () => {
    return (
        <Route path="/:id" exact component={Child}/>
    )

};