import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default (props) => {
    const { path, Component } = props;
    let hasToken;
    localStorage.getItem('token') || 
    sessionStorage.getItem('token') ? hasToken = true : hasToken = false
    
    return (
      <Route path={path} exact
      render={(props) => (
        hasToken == true ? 
        <Component {...props} /> :
        <Redirect to='/auth/login' />
      )} />
    )
  }