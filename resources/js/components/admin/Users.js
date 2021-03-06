import React, {useState, useEffect} from 'react';
import {Card, List, Tag, Row, Col, Input, Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import styled from "styled-components";

import UserApi from 'api/UserApi';
import AddUserModal from "components/admin/AddUserModal";
import EditUserModal from "components/admin/EditUserModal";

// Styles
const Container = styled.div``;

const Toolbar = styled(Row)`
  justify-content: space-between;
  margin-bottom: 14px;
`;

const ToolbarLeft = styled(Col)``;

const ToolbarRight = styled(Col)``;

const Search = styled(Input.Search)`
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const UserItem = styled(List.Item)`
  display: block;
  cursor: pointer;

  &:hover, &:focus {
    background-color: #f0f5ff;
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
  const [allUserData, setAllUserData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [addUserModalIsVisible, setAddUserModalIsVisible] = useState(false);
  const [editUserModalIsVisible, setEditUserModalIsVisible] = useState(false);

  const showAddUserModal = () => {
    setAddUserModalIsVisible(true);
  };

  const hideAddUserModal = () => {
    setAddUserModalIsVisible(false);
  };

  const showEditUserModal = (id) => {
    setEditUserId(id);
    setEditUserModalIsVisible(true);
  };

  const hideEditUserModal = () => {
    setEditUserModalIsVisible(false);
  };

  const loadUsers = () => {
    UserApi.getUsers().then(function (response) {
      if (response.data.hasOwnProperty('users')) {
        const users = response.data.users;
        setAllUserData(users);
        setUserData(users);
      }
    }).catch(function (error) {
      // @TODO: Print error message here
    });
  };

  const search = (input) => {
    if (input) {
      const filteredUserData = userData.filter(function(user) {
        return user.name.toLowerCase().includes(input.toLowerCase()) ||
          user.email.toLowerCase().includes(input.toLowerCase());
      });

      setUserData(filteredUserData);
    } else {
      setUserData(allUserData);
    }
  }

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
                  onSearch={search}
                  enterButton
                />
              </ToolbarLeft>

              <ToolbarRight>
                <Button type="success" onClick={showAddUserModal}>
                  <PlusOutlined/> New User
                </Button>
              </ToolbarRight>
            </Toolbar>

            <List
              bordered
              pagination={{
                defaultPageSize: 10,
                pageSizeOptions: ["5", "10", "20", "25", "30"],
                showSizeChanger: true
              }}
              dataSource={userData}
              renderItem={user => (
                <UserItem key={`user-item-${user.id}`} onClick={() => showEditUserModal(user.id)}>
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
              )}
            />
          </Card>
        </Col>
      </Row>

      {/*  New User Modal*/}
      <AddUserModal
        visible={addUserModalIsVisible}
        onCancel={hideAddUserModal}
        onSubmit={loadUsers}
      />

      {/* Edit User Modals */}
      <EditUserModal
        id={editUserId}
        visible={editUserModalIsVisible}
        onCancel={hideEditUserModal}
        onSubmit={loadUsers}
      />
    </Container>
  );
}

export default AdminUsers;
