import React, {useState, useEffect} from 'react';
import {Modal, Form, Input, Button, Card, Select, message} from 'antd';

import UserApi from 'api/UserApi';

const {Option} = Select;

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

const EditUserModal = ({id, visible, onCancel, onSubmit}) => {
  const [form] = Form.useForm();

  const loadUser = () => {
    UserApi.getUser(id).then(function (response) {
      if (response.data.hasOwnProperty('user')) {
        const userData = response.data.user;
        form.setFieldsValue({
          email: userData.email,
          name: userData.name,
          admin: !!userData.admin
        });
      }
    }).catch(function (error) {
      // @TODO: Print error message here
    });
  };

  const onFinish = (data) => {
    UserApi.updateUser(id, data).then(function (response) {
      form.resetFields();
      loadUser();
      onSubmit();
      onCancel();
      message.success(response.data.message);
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
    if (visible && id) {
      loadUser();
    }
  }, [visible, id]);

  return (
    <Modal
      title="Edit User"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button form={`edit-user-${id}`} type="primary" htmlType="submit">
          Update
        </Button>
      ]}
    >
      <Card>
        <Form
          {...formItemLayout}
          form={form}
          id={`edit-user-${id}`}
          onFinish={onFinish}
        >

          <Form.Item
            name="email"
            label="Email"
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
          >
            <Input/>
          </Form.Item>

          <Form.Item
            name="admin"
            label="User Type"
            rules={[
              {required: true, message: 'User type input is required'},
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
        </Form>
      </Card>
    </Modal>
  );
}

export default EditUserModal;
