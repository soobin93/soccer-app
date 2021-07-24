import React, {useState, useEffect} from 'react';
import {List, Tag, Row, Col} from 'antd';
import {Link} from 'react-router-dom';
import styled from "styled-components";

import UserApi from 'api/UserApi';

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

function AdminUsers() {
  const [userData, setUserData] = useState([]);

  // When the page is loaded
  useEffect(() => {
    UserApi.getUsers().then(function (response) {
      if (response.data.hasOwnProperty('users')) {
        const users = response.data.users;
        setUserData(users);
      }
    }).catch(function (error) {
      // @TODO: Print error message here
    });
  }, []);

  return (
    <Row type="flex" justify="center">
      <Col span={20}>
        <List
          header={<div><strong>Users</strong></div>}
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
      </Col>
    </Row>);

}

export default AdminUsers;
