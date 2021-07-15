import { Table, Space, Button, Row, Col} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react';

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
          title: 'User Type',
          dataIndex: 'user_type',
          key: 'user_type'
        },
        {
          title: 'Delete\nEdit',
          dataIndex: 'delete_edit',
          key: 'delete_edit',
          render: () =>(
            <Space>
                <Button size="small"><DeleteOutlined /></Button>
                <Button size="small"><EditOutlined /></Button>
            </Space>
          ),
        },
      ];
      
    const data = [];
    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            name: `User ${i}`,
            email: `user${i}`+'@google.com.au',
            user_type: `Admin or User`,
        });
    }
    
    return (
      <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col span={18}>
                <h1>Admin Page</h1>
                <Table columns={columns} dataSource={data} size="small"/>
            </Col>
      </Row>);
                
}

export default AdminUser;