import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoginPage from 'routes/login';

import AdminRoute from 'components/routes/AdminRoute';
import UserRoute from 'components/routes/UserRoute';

import AdminUser from 'routes/admin/user';
import AdminUserAdd from 'routes/admin/user/add';
import AdminUserView from 'routes/admin/user/view';

import Unauthorized from 'routes/error/unauthorized';

import NavBar from "components/NavBar";

export default () => {

    return (
        <Router>
            <NavBar/>
            <Switch>
                <Route path="/" exact component={LoginPage}/>

                {/* Error Pages */}
                <Route path="/error/unauthorized" exact component={Unauthorized}/>

                {/* Member Pages */}

                {/* Admin Pages */}
                <Route path="/admin/user" exact component={AdminUser}/>
                <Route path="/admin/user/add" exact component={AdminUserAdd}/>
                <Route path="/admin/user/:id" exact component={AdminUserView}/>
            </Switch>
        </Router>
    )
}
