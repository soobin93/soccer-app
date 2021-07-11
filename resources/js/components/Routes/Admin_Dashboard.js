import { Table, Space, Button} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';


function Admin_User() {

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
    
    return ReactDOM.render(<Table columns={columns} dataSource={data} size="small"/>, mountNode);
                
}

export default Admin_User;