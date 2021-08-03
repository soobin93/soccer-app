import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {Row, Col, Button, Form, Input, Select} from "antd";
import AvatarInput from "components/AvatarInput";

const {Option} = Select;

const StyledButton = styled(Button)`
  width: 100%;
`

const UserForm = (props) => {
  const [avatar, setAvatar] = useState(null);

  const onFinish = (data) => {
    if (avatar) data['avatar'] = avatar;
    props.onFinish(data);
  };

  useEffect(() => {
    if (props.userData) {
      props.form.setFieldsValue({
        email: props.userData.email,
        name: props.userData.name,
        admin: !!props.userData.admin,
        avatar: props.userData.avatar,
        password: null,
        password_confirmation: null
      });
    }

  }, [props.userData]);

  return (
    <Form
      form={props.form}
      name="update"
      layout="vertical"
      onFinish={onFinish}
    >
      {props.isProfile ? (
        <AvatarInput onUpdate={setAvatar} initialValue={props.userData.avatar ?? null} />
      ) : null}

      <Form.Item
        name="email"
        label="Email"
      >
        {props.userData ? (
          <Input disabled/>
        ) : (
          <Input/>
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

      <Form.Item>
        <StyledButton type="primary" htmlType="submit">
          Submit
        </StyledButton>
      </Form.Item>
    </Form>
  );
}

export default UserForm;