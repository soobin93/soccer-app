import React from "react";
import Router from "./Router";
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";

function App() {
    return (

        <div className="App">
            <Router/>
        </div>

    );
}

export default App;

if (document.getElementById('login-test')) {
    ReactDOM.render(<App />, document.getElementById('login-test'));
}
