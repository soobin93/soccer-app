import React from 'react';
import {Modal, Form, Button, Card, message} from 'antd';

import UserApi from 'api/UserApi';
import UserForm from "components/UserForm";


const AddUserModal = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

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
      footer={[]}
    >
      <Card>
        <UserForm onFinish={onFinish} isProfile={false} form={form}/>
      </Card>
    </Modal>
  )
}

export default AddUserModal;




