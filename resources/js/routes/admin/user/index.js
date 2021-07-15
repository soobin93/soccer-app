import { Table, Space, Button, Row, Col} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react';

import UserApi from 'api/UserApi';

function AdminUser() {

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Type',
          dataIndex: 'admin',
          key: 'admin'
        },
        {
          title: 'Control',
          dataIndex: 'control',
          key: 'control',
          render: () =>(
            <Space>
                <Button size="small"><DeleteOutlined /></Button>
                <Button size="small"><EditOutlined /></Button>
            </Space>
          ),
        },
      ];

    const [userData, setUserData] = useState([]);

    // When the page is loaded
    useEffect(() => {
      UserApi.getUsers().then(function (response) {
        if (response.data.hasOwnProperty('users')) {
          let data = [];
          const users = response.data.users;
          for (const user of users) {
            data.push({
              key: user.id,
              name: user.name,
              email: user.email,
              admin: user.admin
                ? 'Admin'
                : 'Member'
            });
          }
          setUserData(data);
        }
      }).catch(function (error) {

      });
    }, []);
    
    return (
      <Row style={{ minHeight: '100vh' }}>
            <Col xs={{ span: 20, offset: 2}} lg={{ span: 18, offset: 3 }}>
                <h2 style={{ marginTop: '24px' }}>Users</h2>
                <Table columns={columns} dataSource={userData} size="small"/>
            </Col>
      </Row>);
                
}

export default AdminUser;