import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {withRouter, NavLink} from "react-router-dom";

import userApi from '../../api/UserApi';

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

    const onFinish = (data) => {
        event.preventDefault();
        console.log(data);
        userApi.login(data);

        try{
            userApi.getCurrentUser();
        }
        catch (e){
            console.log(e);
        }

    };

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
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
                        <StyledButton type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </StyledButton>
                    </Form.Item>
                    <Form.Item>
                        <ForgotPassword className="login-form-forgot" href="">
                            Forgot password
                        </ForgotPassword>
                        <SLink to="/register">Register</SLink>
                    </Form.Item>
                    <Form.Item>
                        <SLink to="/AdminEdit">Admin Edit</SLink>
                    </Form.Item>

                </Form>
            </Col>
        </Row>


    );

}

export default LoginPage;
