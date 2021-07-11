import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import userApi from 'api/UserApi';

const Container = styled.div`
  padding: 40px 20px;
`;

function UserListTest() {

  const getUsers = () => {
    userApi.getUsers();
  };

  return (
    <Container>
      <h3>User List</h3>
      <button type="button" onClick={getUsers}>Load Users</button>
    </Container>
  );
}

export default UserListTest;

if (document.getElementById('user-list-test')) {
  ReactDOM.render(<UserListTest />, document.getElementById('user-list-test'));
}
