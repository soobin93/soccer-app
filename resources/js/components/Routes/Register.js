import React, { useState } from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import styled from "styled-components";

import userApi from '../../api/UserApi';

const Title = styled.h1`
    text-align: center;
    margin-bottom: 10%;
`

const StyledButton = styled(Button)`
  width: 100%;
`

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const Register = () => {
    const [form] = Form.useForm();

    const onFinish = (data) => {
        userApi.register(data);
    };

    return(
        <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col span={8}>
                <Title>Register</Title>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
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
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="password_confirmation"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Name"
                        tooltip="What do you want others to call you?"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <StyledButton type="primary" htmlType="submit">
                            Register
                        </StyledButton>
                    </Form.Item>

                </Form>
            </Col>
        </Row>


    )
}

export default Register;




