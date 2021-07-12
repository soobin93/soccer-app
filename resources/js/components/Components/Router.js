import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from '../Routes/Login';
import Register from '../Routes/Register';
import AdminDashboard from '../Routes/AdminDashboard';

export default () => {
    return(
        <Router>
            <Route path="/" exact component={LoginPage} />
            <Route path="/register" exact component={Register} />
            <Route path="/AdminDashboard" exact component={AdminDashboard} />
        </Router>
    )
}
