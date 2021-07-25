import React, {useState, useEffect} from 'react';
import {Card, List, Tag, Row, Col, Input, Button, Modal} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import styled from "styled-components";

import UserApi from 'api/UserApi';
import AddUserModal from "components/admin/AddUserModal";

// Styles
const Container = styled.div``;

const Toolbar = styled(Row)`
  justify-content: space-between;
  margin-bottom: 14px;
`;

const ToolbarLeft = styled(Col)``;

const ToolbarRight = styled(Col)``;

const Search = styled(Input.Search)`
  width: 200px;
`;

const UserItem = styled(List.Item)`
  display: block;

  &:hover, &:focus {
    background-color: #f0f5ff;
  }
`;

const UserLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: black;

  &:hover, &:focus {
    color: black;
  }
`;

const UserDetails = styled(Col)``;

const UserEmail = styled.span`
  font-size: 90%;
  color: #595959;
  margin-left: 4px;
`;

const UserType = styled(Col)`
  text-align: right;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 8px;
  }
`;

const UserTypeTag = styled(Tag)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Component
function AdminUsers() {
  const [userData, setUserData] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const showModal = () => {
    setModalIsVisible(true);
  };

  const hideModal = () => {
    setModalIsVisible(false);
  };

  const loadUsers = () => {
    UserApi.getUsers().then(function (response) {
      if (response.data.hasOwnProperty('users')) {
        const users = response.data.users;
        setUserData(users);
      }
    }).catch(function (error) {
      // @TODO: Print error message here
    });
  };

  // When the page is loaded
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Container>
      {/* Main Component */}
      <Row type="flex" justify="center">
        <Col xs={{span: 22}} lg={{span: 20}}>
          <Card>
            <h2>Users</h2>

            <Toolbar>
              <ToolbarLeft>
                <Search
                  placeholder="type search text"
                  allowClear
                  // onSearch={onSearch}
                />
              </ToolbarLeft>

              <ToolbarRight>
                <Button type="success" onClick={showModal}>
                  <PlusOutlined /> New User
                </Button>
              </ToolbarRight>
            </Toolbar>

            <List
              bordered
              dataSource={userData}
              renderItem={user => (
                <UserLink to={`/admin/user/${user.id}`}>
                  <UserItem>
                    <Row>
                      <UserDetails xs={{span: 24, order: 2}} md={{span: 18, order: 1}}>
                        {user.name}
                        <UserEmail>- {user.email}</UserEmail>
                      </UserDetails>

                      <UserType xs={{span: 24, order: 1}} md={{span: 6, order: 2}}>
                        {user.admin
                          ? <UserTypeTag color="red" style={{padding: '0 12px'}}>admin</UserTypeTag>
                          : <UserTypeTag color="green">member</UserTypeTag>
                        }
                      </UserType>
                    </Row>
                  </UserItem>
                </UserLink>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/*  New User Modal*/}
      <AddUserModal
        visible={modalIsVisible}
        onCancel={hideModal}
        onSubmit={loadUsers}
      />
    </Container>
    );

}

export default AdminUsers;
