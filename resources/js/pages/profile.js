import React, {useEffect, useState} from "react";
import UserForm from "components/UserForm";
import UserApi from "api/UserApi";
import {Card, Col, Form, message, Row} from "antd";
import {useHistory, useParams} from "react-router-dom";
import {useUser} from "components/contexts/UserContext";

const UserProfileView = () => {
  const [id, setId] = useState(useParams().id);
  const [form] = Form.useForm();
  const [user] = useUser();
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  const setCurrentId = () => {
    if (!id) {
      setId(user.id);
    }
  }

  const loadUser = () => {
    if (id) {
      UserApi.getUser(id).then(function (response) {
        if (response.data.hasOwnProperty('user')) {
          setUserData(response.data.user);
        }
      }).catch(function (error) {
        // @TODO: Print error message here
      });
    }
  }

  const onFinish = (data) => {
    UserApi.updateUser(id, data).then(function (response) {
      message.success(response.data.message);
      history.push('/');
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
    loadUser();
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
          <Card title={"Profile"}>
            <UserForm onFinish={onFinish} isProfile={true} userData={userData} form={form}/>
          </Card>
        </Col>
      </Row>
    );
}

export default UserProfileView;
