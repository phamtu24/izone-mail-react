import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Add from './components/add/add';
import DataContext from './contexts/data_context';
import DataProvider from './components/data_provider';
import IndividualMail from './components/mail/individual_mail';
import MailData from './components/mail/mail_data.js';
import MailDetail from './components/mail/mail_detail';
import NavBar from './components/navbar/navbar';
import PhotoRoute from './components/photos/all_photos/photo_route';
import PrivateRoute from './components/protect/ProtectRoute';
import Login from './components/login/login';
import './style.css';




export default () => {
  return (
    <Router>
      <DataProvider>
        <div className='App'>
          <DataContext.Consumer>
            {({ members }) => <NavBar members={members}/>}
          </DataContext.Consumer>
          <Route path="/auth/login" exact component={Login}/>
          <PrivateRoute path="/" Component={MailData}/>
          <PrivateRoute path="/mail/:id" Component={MailDetail}/>
          <PrivateRoute path="/:id" Component={IndividualMail}/>
          <PrivateRoute path="/photos/:id" Component={PhotoRoute}/>
          <PrivateRoute path="/Add/Add-new-mail" Component={Add}/>
        </div>
      </DataProvider>
    </Router>
  );
};
