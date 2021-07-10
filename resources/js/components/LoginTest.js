import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import userApi from 'api/UserApi';

const Container = styled.div`
  padding: 40px 20px;
`;

const Form = styled.form`
  width: 100%;
`;

function LoginTest() {

  const handleSubmit = (event) => {
    event.preventDefault();

    userApi.login();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <input name="name" type="text" />

        <button type="submit">Submit</button>
      </Form>
    </Container>
  );
}

export default LoginTest;

if (document.getElementById('login-test')) {
  ReactDOM.render(<LoginTest />, document.getElementById('login-test'));
}
