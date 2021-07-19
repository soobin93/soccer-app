import React, { useState } from 'react';
import { Form, Input, Row, Col, Button, Card, Select, message } from 'antd';
import styled from "styled-components";

import UserApi from 'api/UserApi';

const { Option } = Select;

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

const Add = () => {
    const [form] = Form.useForm();

    const initialValues = {
        admin: false
    };

    const onFinish = (data) => {
        UserApi.register(data).then(function (response) {
            message.success('A user has been successfully added!')
            form.resetFields();
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
                message.error('Error: please check your inputs and submit again');
            }
        });
    };

    return(
        <Row type="flex" justify="center" align="middle" style={{minHeight: '90vh'}}>
            <Col span={20}>
                <Card title="Add New User">
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        initialValues={initialValues}
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

                        <Form.Item
                            name="admin"
                            label="User Type"
                            rules={[
                                { required: true, message: 'Please select your user type!' },
                            ]}
                        >
                            <Select
                                placeholder="Select user type"
                                allowClear
                            >
                                <Option value={false}>Member</Option>
                                <Option value={true}>Admin</Option>
                            </Select>
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

                        <Form.Item {...tailFormItemLayout}>
                            <StyledButton type="primary" htmlType="submit">
                                Register
                            </StyledButton>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default Add;




