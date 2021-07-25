import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Form, Input, Row, Col, Button, Card, Select, message, Avatar, Upload} from 'antd';
import styled from 'styled-components';

import UserApi from 'api/UserApi';
import {useUser} from "components/contexts/UserContext";
import {UploadOutlined, UserOutlined} from "@ant-design/icons";

const {Option} = Select;

const StyledButton = styled(Button)`
  width: 100%;
`

const AvatarContainer = styled.div`
  display: flex; 
  justify-content: center;
  margin-bottom: 5%;

`
const StyledUpload = styled(Upload)`
  display: flex; 
  justify-content: center;
  margin-bottom: 5%;
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

const properties = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const UserProfile = (props) => {
  const [id, setId] = useState(useParams().id);
  const [form] = Form.useForm();
  const [user] = useUser();
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  const setCurrentId = () => {
    if(!id){
      setId(user.id);
    }
  }

  const onFinish = (data) => {
    UserApi.updateUser(id, data).then(function (response) {
      message.success(response.data.message);
      if(props.isAdminView){
        history.push('/admin');
      }else{
        history.push('/');
      }
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
    setCurrentId();

    if(id){
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
    }
  }, [id]);

  return !userData
    // Loading
    // @TODO: Add a proper loader here
    ? (
      <Row type="flex" justify="center">
        <Col span={20} style={{textAlign: 'center'}}>
          <h2>Loading...</h2>
        </Col>
      </Row>
    ) : (
      <Row type="flex" justify="center">
        <Col span={20}>
          <Card title={props.isAdminView ? "Update" : "Profile"}>
            <Form
              {...formItemLayout}
              form={form}
              name="update"
              onFinish={onFinish}
            >
              {/*Where do we save and get image from?*/}

              {!props.isAdminView ? (
                <>
                <AvatarContainer>
                  <Avatar size={100} icon={<UserOutlined />} />
                </AvatarContainer>
                <StyledUpload {...properties}>
                  <Button icon={<UploadOutlined/>}>Upload</Button>
                </StyledUpload>

                </>
              ) : null}


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

export default UserProfile;
