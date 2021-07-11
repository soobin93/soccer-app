import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import userApi from 'api/UserApi';

const Container = styled.div`
  padding: 40px 20px;
`;

const Form = styled.form`
  width: 100%;
`;

function RegisterTest() {

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  const { register, setValue, handleSubmit } = useForm({
    defaultValues
  });

  const onSubmit = (data) => {
      console.log(data);
    userApi.register(data).then(response => {
      for (const inputName in defaultValues) {
        setValue(inputName, defaultValues[inputName]);
      }
    });
  };

  return (
    <Container>
      <h3>Register</h3>

      <Form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label>Name</label>
          <input type="text" {...register('name')}/>
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register('email')}/>
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register('password')}/>
        </div>

        <div>
          <label>Password Confirmation</label>
          <input type="password" {...register('password_confirmation')}/>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </Container>
  );
}

export default RegisterTest;

if (document.getElementById('register-test')) {
  ReactDOM.render(<RegisterTest />, document.getElementById('register-test'));
}
