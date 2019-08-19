import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './style.css';
import DataProvider from './components/data_provider';
import NavBar from './components/navbar/navbar';
import MailData from './components/mail/mail_data.js';
import DataContext from './contexts/data_context';
import MailDetail from './components/mail/mail_detail';
import IndividualMail from './components/mail/individual_mail';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function renderRoute(path, component) {
  return (
    <Route exact path={path}>
      {({ match }) => (
        <CSSTransition
          in={match != null}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          {component}
        </CSSTransition>
      )}
    </Route>
  )
}

class App extends Component {
  
  render () {

    return (
      <Router>
        <DataProvider>
          <div className='App'>
            <DataContext.Consumer>
              { ({members}) => <NavBar members={members}/>}
            </DataContext.Consumer>
              {renderRoute('/', MailData)}
              
              <MailDetail/>
              <IndividualMail/>
            </div>
        </DataProvider>
      </Router>
    ); 
  };
};

export default App;
