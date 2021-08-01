import React, {useState, useEffect} from 'react';
import {Modal, Form, Button, Card, message} from 'antd';

import UserApi from 'api/UserApi';
import UserForm from "components/UserForm";

const EditUserModal = ({id, visible, onCancel, onSubmit}) => {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(null);

  const loadUser = () => {
    UserApi.getUser(id).then(function (response) {
      if (response.data.hasOwnProperty('user')) {
        setUserData(response.data.user);
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
      footer={[]}
    >
      <Card>
        <UserForm onFinish={onFinish} isProfile={false} userData={userData} form={form}/>
      </Card>
    </Modal>
  );
}

export default EditUserModal;
