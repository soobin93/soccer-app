import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from 'routes/login';

import AdminRoute from 'components/routes/AdminRoute';
import UserRoute from 'components/routes/UserRoute';

import AdminUser from 'routes/admin/user';
import AdminUserAdd from 'routes/admin/user/add';
import AdminUserView from 'routes/admin/user/view';

import Unauthorized from 'routes/error/unauthorized';

export default () => {

  return (
    <Router>
      <Route path="/" exact component={LoginPage}/>

      {/* Error Pages */}
      <Route path="/error/unauthorized" exact component={Unauthorized}/>

      {/* Member Pages */}

      {/* Admin Pages */}
      <UserRoute path="/admin/user" exact component={AdminUser}/>
      <UserRoute path="/admin/user/add" exact component={AdminUserAdd}/>
      <UserRoute path="/admin/user/:id" exact component={AdminUserView}/>

    </Router>
  )
}
