import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './style.css';
import Add from './components/add/add';
import DataContext from './contexts/data_context';
import DataProvider from './components/data_provider';
import IndividualMail from './components/mail/individual_mail';
import MailData from './components/mail/mail_data.js';
import MailDetail from './components/mail/mail_detail';
import NavBar from './components/navbar/navbar';
import PhotoRoute from './components/photos/all_photos/photo_route';

const testCom = () => {
  return <h1> fello </h1>
}
class App extends Component {

  render() {
    return (
      <Router>
        <DataProvider>
          <div className='App'>
            <DataContext.Consumer>
              {({ members }) => <NavBar members={members} />}
            </DataContext.Consumer>
            <Route path="/mail/:id" exact component={MailDetail} />
            <Route path="/:id" exact component={IndividualMail} />
            <Route path="/photos/:id" exact component={PhotoRoute} />
            <Route path="/" exact component={MailData} />
            <Route path="/Add/Add-new-mail" exact component={Add} />
          </div>
        </DataProvider>
      </Router>
    );
  };
};

export default App;
