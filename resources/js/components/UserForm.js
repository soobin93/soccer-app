import React, {useEffect} from 'react';
import {Button, Form, Input, Select} from "antd";
import UserAvatar from "components/Avatar";
import styled from "styled-components";

const {Option} = Select;

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

const UserForm = (props) => {

  const onFinish = (data) => {
    props.onFinish(data);
  };

  useEffect(() => {

    if(props.userData){
      props.form.setFieldsValue({
        email: props.userData.email,
        name: props.userData.name,
        admin: !!props.userData.admin
      });
    }
  })

  return(
    <Form
      {...formItemLayout}
      form={props.form}
      name="update"
      onFinish={onFinish}
    >
      {/*Where do we save and get image from?*/}

      {props.isProfile ? (
        <UserAvatar />
      ) : null}


      <Form.Item
        name="email"
        label="Email"
        initialValue={props.userData ? props.userData.email : ""}
      >
        {props.userData ? (
          <Input disabled />
        ) : (
          <Input />
        )}
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
        initialValue={props.userData ? props.userData.name : ""}
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

      <Form.Item {...tailFormItemLayout}>
        <StyledButton type="primary" htmlType="submit">
          Update
        </StyledButton>
      </Form.Item>
    </Form>
  )
}

export default UserForm;