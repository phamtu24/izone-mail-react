import React from 'react';
import Mail from './mail';
import DataContext from '../../contexts/data_context';


export default () => {
    return (
        <DataContext.Consumer>
            {({messages}) =>
                <> 
                    {
                        messages.length > 0 &&
                        messages.map(mess => <Mail Mail={mess} />)
                    }
                    {
                        messages.length === 0 &&
                        <img className="indicator" width="15rem"
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
                    }
                </>
            }
        </DataContext.Consumer>

    );
};