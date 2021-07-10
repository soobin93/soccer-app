import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
  return (
    <div className="container">
      <div className="row justify-content-center mt-4">
        <div className="col-md-8 col-md-offset-2">
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
