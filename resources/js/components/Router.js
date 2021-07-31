import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AdminRoute from "components/routes/AdminRoute";
import GuestRoute from "components/routes/GuestRoute";
import UserRoute from "components/routes/UserRoute";
import NavBar from "components/NavBar";
import LandingPage from "components/LandingPage";

import UserApi from "api/UserApi";

import Admin from "pages/admin";
import LoginPage from "pages/login";
import ProfilePage from "pages/profile";
import Unauthorized from "pages/error/unauthorized";
import NotFound from "pages/error/not-found";

export default () => {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <GuestRoute path="/login" exact component={LoginPage}/>

        {/* Member Pages */}
        <UserRoute path="/" exact component={LandingPage} />
        <UserRoute path="/profile" exact component={ProfilePage} />

        {/* Admin Pages */}
        <UserRoute path="/admin" exact component={Admin}/>

        {/* Error Pages */}
        <Route path="/error/unauthorized" exact component={Unauthorized}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  )
}

export function beforeRender() {
  const excludedPageList = [

  ];

  const localStorageUser = localStorage.getItem('user');

  if (localStorageUser) {
    UserApi.getCurrentUser();
  }
}
