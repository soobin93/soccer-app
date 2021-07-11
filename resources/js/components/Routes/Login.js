import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {withRouter, NavLink} from "react-router-dom";

const Title = styled.h1`
  text-align: center;
    margin-bottom: 10%;
`
const StyledButton = styled(Button)`
    width: 100%;
`;

const ForgotPassword = styled.a`
    float: right;
`;

const SLink = styled(NavLink)`
    width: 100%;
`;

const LoginPage = () => {

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col span={10}>
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
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <ForgotPassword className="login-form-forgot" href="">
                            Forgot password
                        </ForgotPassword>
                    </Form.Item>

                    <Form.Item>
                        <StyledButton type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </StyledButton>
                        Or <SLink to="/register">register now!</SLink>
                    </Form.Item>
                </Form>
            </Col>
        </Row>


    );

}

export default LoginPage;
