import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from '../Routes/Login';
import Register from '../Routes/Register';
import AdminEdit from '../Routes/AdminEdit';

export default () => {
    return(
        <Router>
            <Route path="/" exact component={LoginPage} />
            <Route path="/register" exact component={Register} />
            <Route path="/AdminEdit" exact component={AdminEdit} />
        </Router>
    )
}
