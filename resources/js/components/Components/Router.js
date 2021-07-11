import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from '../Routes/Login';
import Register from '../Routes/Register';

export default () => {
    return(
        <Router>
            <Route path="/" exact component={LoginPage} />
            <Route path="/register" exact component={Register} />
        </Router>
    )
}
