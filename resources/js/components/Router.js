import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AdminRoute from 'components/routes/AdminRoute';
import UserRoute from 'components/routes/UserRoute';
import NavBar from "components/NavBar";
import LandingPage from "components/LandingPage";

import UserApi from "api/UserApi";

import Admin from 'pages/admin';
import LoginPage from 'pages/login';
import Unauthorized from 'pages/error/unauthorized';

export default () => {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/login" exact component={LoginPage}/>

        {/* Error Pages */}
        <Route path="/error/unauthorized" exact component={Unauthorized}/>

        {/* Member Pages */}
        <UserRoute path="/" exact component={LandingPage} />

        {/* Admin Pages */}
        <UserRoute path="/admin" exact component={Admin}/>
      </Switch>
    </Router>
  )
}

export function beforeRender() {
  const localStorageUser = localStorage.getItem('user');

  if (localStorageUser) {
    UserApi.getCurrentUser().then(function (response) {
      if (response.data.hasOwnProperty('user')) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }).catch(function (error) {
      UserApi.logout().then(function (response) {
        location.reload();
      });
    });
  }
}
