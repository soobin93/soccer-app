import {Upload, message, Avatar, Button} from 'antd';
import {LoadingOutlined, PlusOutlined, UploadOutlined, UserOutlined} from '@ant-design/icons';
import styled from "styled-components";
import UserApi from "api/UserApi";
import {useUser} from "components/contexts/UserContext";

const AvatarContainer = styled.div`
  display: flex; 
  justify-content: center;
  margin-bottom: 5%;

`
const StyledUpload = styled(Upload)`
  display: flex; 
  justify-content: center;
  margin-bottom: 5%;
`

const UserAvatar = () => {

  const [user] = useUser();
  const {id} = user;

  const props = {
    name: 'file',
    action: (file) => {
      UserApi.updateUser(id, {
        ...user,
        image: file
      }).then((response) => {
        console.log(response);
      })
    },
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return(
    <>
      <AvatarContainer>
        <Avatar size={{
          xs: 100,
          sm: 110,
          md: 120,
          lg: 130,
          xl: 140,
          xxl: 150,
        }} icon={<UserOutlined />} />
      </AvatarContainer>
      <StyledUpload {...props}>
        <Button icon={<UploadOutlined/>}>Upload</Button>
      </StyledUpload>

    </>
  )
}

export default UserAvatar;