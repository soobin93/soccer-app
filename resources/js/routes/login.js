import styled from "styled-components";
import React from "react";
import {Form, Input, Button, Row, Col} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {useUser} from 'components/contexts/UserContext';

import UserApi from 'api/UserApi';

const Title = styled.h1`
  text-align: center;
  margin-bottom: 10%;
`
const StyledButton = styled(Button)`
  width: 100%;
`;

const LoginPage = () => {

  const [form] = Form.useForm();
  const [user, setUser] = useUser();
  const history = useHistory();

  const onFinish = (data) => {
    event.preventDefault();

    UserApi.login(data).then(function (response) {
      UserApi.getCurrentUser().then(function(res){
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        history.push('/admin/user');
      });
    }).catch(function (error) {
      if (error.response.data.hasOwnProperty('errors')) {
        const errors = error.response.data.errors;
        let fields = [];
        for (const inputKey in errors) {
          if (errors.hasOwnProperty(inputKey)) {
            fields.push({
              name: inputKey,
              errors: [errors[inputKey]]
            });
          }
        }

        form.setFields(fields);
      }
    });
  };

  const logOut = () => {
    UserApi.logout().then(function (response) {
      location.reload();
    });
  }

  return (
    <Row type="flex" justify="center" align="middle" style={{minHeight: '80vh'}}>
      <Col span={18}>
        <Title>Welcome to Soccer App</Title>
        <Form
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please type your email',
              }
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email"/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please type your password',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon"/>}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <StyledButton type="primary" htmlType="submit" className="login-form-button">
              Log in
            </StyledButton>
          </Form.Item>
          <Form.Item>
            <StyledButton type="danger" onClick={logOut}>
              Log Out
            </StyledButton>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default LoginPage;
