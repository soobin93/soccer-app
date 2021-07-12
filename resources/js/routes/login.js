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

  const [user, setUser] = useUser();
  const history = useHistory();

  const onFinish = (data) => {
    event.preventDefault();

    UserApi.login(data).then(function (response) {
      setUser(response.data.user);
      history.push('/admin/user')
    });
  };

  const logOut = () => {
    UserApi.logout().then(function (response) {
      location.reload();
    });
  }

  return (
    <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
      <Col span={18}>
        <Title>Welcome to Soccer App!</Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email"/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
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
