import React from 'react';
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

const AddUserModal = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const initialValues = {
    admin: false
  };

  const onFinish = (data) => {
    UserApi.createUser(data).then(function (response) {
      message.success(response.data.message);
      form.resetFields();
      onSubmit();
      onCancel();
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

  return (
    <Modal
      title="New User"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button form="add-user" type="primary" htmlType="submit">
          Submit
        </Button>
      ]}
    >
      <Card>
        <Form
          {...formItemLayout}
          form={form}
          id="add-user"
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                required: true,
                message: 'Please type your E-mail',
              }
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: 'Please type your name',
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
              {required: true, message: 'Please select your user type!'},
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
                message: 'Please type your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password/>
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
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password/>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  )
}

export default AddUserModal;




