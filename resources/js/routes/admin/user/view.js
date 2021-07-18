import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Form, Input, Row, Col, Button, Card, Select, message} from 'antd';
import styled from 'styled-components';

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

const Edit = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [userData, setUserData] = useState(null);
    const history = useHistory();

    const onFinish = (data) => {
        UserApi.updateUser(id, data).then(function (response) {
            message.success(response.data.message);
            history.push('/admin/user');
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

    // When the page is loaded
    useEffect(() => {
        UserApi.getUser(id).then(function (response) {
            if (response.data.hasOwnProperty('user')) {
                const userData = response.data.user;
                setUserData({
                    email: userData.email,
                    name: userData.name,
                    admin: userData.admin
                });
            }
        }).catch(function (error) {
            // @TODO: Print error message here
        });
    }, []);

    return !userData
      // Loading
      // @TODO: Add a loader here
      ? (
        <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col span={20} style={{ textAlign: 'center' }}>
                <h2>Loading...</h2>
            </Col>
        </Row>
      ) : (
        <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col span={20}>
                <Card title="Update">
                    <Form
                      {...formItemLayout}
                      form={form}
                      name="update"
                      onFinish={onFinish}
                    >

                        <Form.Item
                          name="email"
                          label="Email"
                          initialValue={userData.email}
                        >
                            <Input disabled/>
                        </Form.Item>

                        <Form.Item
                          name="name"
                          label="Name"
                          rules={[
                              {
                                  required: true,
                                  message: 'Name input is required',
                                  whitespace: true,
                              },
                          ]}
                          initialValue={userData.name}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                          name="admin"
                          label="User Type"
                          rules={[
                              {required: true, message: 'User type input is required'},
                          ]}
                          initialValue={!!userData.admin}
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
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item
                          name="password_confirmation"
                          label="Confirm Password"
                          dependencies={['password']}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <StyledButton type="primary" htmlType="submit">
                                Update
                            </StyledButton>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
      );
}

export default Edit;




