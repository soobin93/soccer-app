import React from "react";
import Router, {beforeRender} from "./Router";
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import 'antd-button-color/dist/css/style.css';
import {UserProvider} from "./contexts/UserContext";

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

if (document.getElementById('app')) {
  beforeRender();
  ReactDOM.render(<App />, document.getElementById('app'));
}
