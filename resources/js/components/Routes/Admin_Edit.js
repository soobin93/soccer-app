import React, { useState } from 'react';
import { Form, Input, Row, Col, Button, Card, Tooltip } from 'antd';
import styled from "styled-components";

import userApi from '../../api/UserApi';
import { ToolFilled } from '@ant-design/icons';

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
    const [form] = Form.useForm();

    const onFinish = (data) => {
        userApi.updateUser(data);
    };

    const warningTooltip = <span>Email is not allowed to change</span>

    var titleName = 'User1'
    return(
        <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col span={20}>
                <Card title={'Updating '+ titleName}>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="update"
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
                                    message: 'Please input E-mail!',
                                },
                            ]}
                            initialValue="user1@hotmail.com"
                        >
                            <Input disabled/>
                        </Form.Item>
                        
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input name!',
                                    whitespace: true,
                                },
                            ]}
                            initialValue="user1"
                        >
                            <Input />
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


    )
}

export default Edit;




