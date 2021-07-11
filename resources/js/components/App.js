import React from "react";
import Router from "./Components/Router";
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";

function App() {

    const meta = document.createElement('meta');
    meta.name = 'viewport';

    meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');

    document.getElementsByTagName('head')[0].appendChild(meta);

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
