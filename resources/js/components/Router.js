import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from 'routes/login';
import Register from 'routes/register';
import AdminUser from 'routes/admin/user';

export default () => {
    return(
        <Router>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/admin/dashboard" exact component={AdminUser} />
        </Router>
    )
}
