import styled from "styled-components";
import React from "react";
import {Form, Input, Button, Row, Col, Card} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {useUser} from 'components/contexts/UserContext';

import UserApi from 'api/UserApi';

const Container = styled(Row)`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

const LogInCard = styled(Card)`
  padding: 40px 14px;
`;

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
      if (response.data.hasOwnProperty('user')) {
        const currentUser = response.data.user;

        localStorage.setItem('user', JSON.stringify(currentUser));
        setUser(currentUser);
        history.push('/');
      }
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

  return (
    <Container>
      <Col span={22}>
        <LogInCard>
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
            <StyledButton type="primary" htmlType="submit" className="login-form-button">
              Sign In
            </StyledButton>
          </Form>
        </LogInCard>
      </Col>
    </Container>
  );
}

export default LoginPage;
