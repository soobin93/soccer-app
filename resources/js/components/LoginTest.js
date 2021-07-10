import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Login Test</div>

            <div className="card-body">I'm an example component!</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Example;

if (document.getElementById('login-test')) {
  ReactDOM.render(<Example />, document.getElementById('login-test'));
}
