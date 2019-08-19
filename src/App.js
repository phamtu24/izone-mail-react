import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './style.css';
import DataProvider from './components/data_provider';
import NavBar from './components/navbar/navbar';
import MailData from './components/mail/mail_data.js';
import DataContext from './contexts/data_context';
import MailDetail from './components/mail/mail_detail';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


class App extends Component {
  
  render () {

    return (
      <Router>
        <DataProvider>
          <div className='App'>
            <DataContext.Consumer>
              { ({members}) => <NavBar members={members}/>}
            </DataContext.Consumer>
              <Route path="/" exact component={MailData} />
              <MailDetail/>
            </div>
        </DataProvider>
      </Router>
    ); 
  };
};

export default App;
