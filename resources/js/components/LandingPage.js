import React from "react";
import {useUser} from "components/contexts/UserContext";
import {Avatar, Card} from "antd";
import Meta from "antd/es/card/Meta";
import {AntDesignOutlined, UserOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const CardContainer = styled.div`
  justify-content: center;
  display: flex;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 20px;
`

const StyledUserOutlined = styled(UserOutlined)`
  margin-right: 10px;
  font-size: large;
`

const Title = styled.div`
  font-size: larger;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`

const StyledLink = styled(NavLink)`
  font-size: medium;
`

const LandingPage = () => {

  const [user] = useUser();

  return (
    <CardContainer>
      <Card
        style={{width: '90%', borderWidth:'2px', borderRadius:'10px'}}
        bodyStyle={{padding: '15px'}}
      >
        <Meta
          avatar={
            <StyledAvatar
              icon={<AntDesignOutlined />}
              size={{ xs: 120, sm: 130, md: 140, lg: 150, xl: 160, xxl: 170 }}
              src={`/storage/avatars/${user.avatar}?v=` + user.avatar_version}
            />}
          title={
            <Title>{user.name}</Title>
          }
          description={
            <>
            <StyledUserOutlined/>
            <StyledLink to='/profile'>Profile</StyledLink>
            </>
          }
        />
      </Card>
    </CardContainer>

  );
}

export default LandingPage;
