import React, {useEffect} from "react";
import UserForm from "components/UserForm";
import UserApi from "api/UserApi";
import {Card, Col, Form, message, Row} from "antd";
import {useHistory} from "react-router-dom";
import {useUser} from "components/contexts/UserContext";

const UserProfileView = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useUser();
  const history = useHistory();

  const onFinish = (data) => {
    UserApi.updateUser(user.id, data).then(function (response) {
      message.success(response.data.message);
      setUser(response.data.user);
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
    UserApi.getCurrentUser();
  }, []);

  return !user
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
          <Card title="Profile">
            <UserForm onFinish={onFinish} isProfile={true} userData={user} form={form}/>
          </Card>
        </Col>
      </Row>
    );
}

export default UserProfileView;
