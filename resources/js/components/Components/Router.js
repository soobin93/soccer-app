import React, {useContext} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from '../Routes/Login';
import Register from '../Routes/Register';
import Test from "../Routes/Test2";
import AdminRoute from "./AdminRoute";

export default () => {

    return(
        <Router>
            <Route path="/" exact component={LoginPage} />
            <AdminRoute path="/register" exact component={Register} />
            <Route path="/unauthorized" exact component={Test}/>
        </Router>
    )
}
