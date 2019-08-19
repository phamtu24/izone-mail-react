import React, { Component } from 'react';
import Mail from './mail';
import DataContext from '../../contexts/data_context';

export default () => {
        return (
            <DataContext.Consumer>
                {({ messages }) =>
                    <div>
                        {messages.length > 0 &&
                            messages.map(mess => <Mail Mail={mess} />)
                        }
                        {messages.length === 0 &&
                            <img className="indicator" style={{ "width": "15rem" }}
                                src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
                        }

                    </div>}
            </DataContext.Consumer>
        );
};