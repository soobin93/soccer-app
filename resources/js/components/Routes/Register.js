import React, { useState } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import styled from "styled-components";

const Title = styled.h1`
    text-align: center;
    margin-top: ${window.innerHeight*0.1}px;
`

const StyledForm = styled(Form)`
    max-width: ${window.innerWidth*0.4}px;
    margin-top: ${window.innerHeight*0.1}px;
    margin-left: ${window.innerWidth*0.3}px;

`;

const Register = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return(
        <>
        <Title>Register</Title>
        <StyledForm
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
                <Input />
            </Form.Item>

        </StyledForm>
        </>

    )
}

export default Register;



