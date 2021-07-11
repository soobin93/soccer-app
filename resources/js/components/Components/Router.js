import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from '../Routes/Login';
import Register from '../Routes/Register';
import Admin_Dashboard from '../Routes/Admin_Dashboard';

export default () => {
    return(
        <Router>
            <Route path="/" exact component={LoginPage} />
            <Route path="/register" exact component={Register} />
            <Route path="/admin_dashboard" exact component={Admin_Dashboard} />
        </Router>
    )
}
