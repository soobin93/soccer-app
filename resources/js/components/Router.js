import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from 'routes/login';

import AdminRoute from 'components/routes/AdminRoute';
import UserRoute from 'components/routes/UserRoute';

import AdminUser from 'routes/admin/user';
import AdminUserAdd from 'routes/admin/user/add';
import AdminUserView from 'routes/admin/user/view';

import Test from 'routes/test';

export default () => {

  return (
    <Router>
      <Route path="/" exact component={LoginPage}/>

      {/* Error Pages */}
      <Route path="/unauthorized" exact component={Test}/>

      {/* Member Pages */}

      {/* Admin Pages */}
      <AdminRoute path="/admin/user" exact component={AdminUser}/>
      <AdminRoute path="/admin/user/add" exact component={AdminUserAdd}/>
      <AdminRoute path="/admin/user/:id" exact component={AdminUserView}/>

    </Router>
  )
}
