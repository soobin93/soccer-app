import React from "react";
import Router from "./Components/Router";
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import {UserProvider} from "./Contexts/UserContext";

function App() {
    return (

        <div className="App">
            <UserProvider>
                <Router/>
            </UserProvider>
        </div>

    );
}

export default App;

if (document.getElementById('login-test')) {
    ReactDOM.render(<App />, document.getElementById('login-test'));
}
