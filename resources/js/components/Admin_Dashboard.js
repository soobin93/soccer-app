import { Table, Space, Button} from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));

function Admin_User() {

    const classes = useStyles();

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
                  <IconButton aria-label="delete" className={classes.margin}>
                      <DeleteIcon />
                  </IconButton>
                  <Fab size="small" aria-label="edit">
                      <EditIcon />
                  </Fab>
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