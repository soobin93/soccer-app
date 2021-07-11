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
          title: 'Delete/Edit',
          dataIndex: 'delete_edit',
          key: 'delete_edit',
          render: (record) =>(
              <Space size="middle">
                  <Button><DeleteOutlined /></Button>
                  <Button><EditOutlined /></Button>
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
    
    return ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);
    //return <Table dataSource={data} columns={columns} />;
                
}

export default Admin_User;

if (document.getElementById('admin_table')) {
    ReactDOM.render(<Admin_User />, document.getElementById('admin_table'));
}