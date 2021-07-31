import React from "react";
import Router, {beforeRender} from "components/Router";
import ReactDOM from "react-dom";
import {UserProvider} from "components/contexts/UserContext";

import "antd/dist/antd.css";
import 'antd-button-color/dist/css/style.css';

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
