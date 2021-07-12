import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import UserApi from 'api/UserApi';

const Container = styled.div`
  padding: 40px 20px;
`;

const Form = styled.form`
  width: 100%;
`;

function LoginTest() {

  const defaultValues = {
    email: '',
    password: ''
  };

  const { register, setValue, handleSubmit } = useForm({
    defaultValues
  });

  const onSubmit = (data) => {
    event.preventDefault();
    UserApi.login(data);
  };

  const logout = () => {
    UserApi.logout();
  };

  const getCurrentUser = () => {
    UserApi.getCurrentUser();
  };

  return (
    <Container>
      <h3>Login</h3>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type="email" {...register('email')}/>
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register('password')}/>
        </div>

        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={logout}>Log Out</button>
          <button type="button" onClick={getCurrentUser}>Current User</button>
        </div>
      </Form>
    </Container>
  );
}

export default LoginTest;

if (document.getElementById('login-test')) {
  ReactDOM.render(<LoginTest />, document.getElementById('login-test'));
}
