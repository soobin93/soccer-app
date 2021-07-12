import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from '../Routes/Login';
import Register from '../Routes/Register';
import AdminEdit from '../Routes/admin/AdminEdit';
import AdminDashboard from '../Routes/admin/AdminDashboard';

export default () => {
    return(
        <Router>
            <Route path="/" exact component={LoginPage} />
            <Route path="/register" exact component={Register} />
            <Route path="/admin/edit" exact component={AdminEdit} />
            <Route path="/admin/dashboard" exact component={AdminDashboard} />
        </Router>
    )
}
