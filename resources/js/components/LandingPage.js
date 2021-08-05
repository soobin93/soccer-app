import React from "react";
import {useUser} from "components/contexts/UserContext";
import {Avatar, Card, Col, Row} from "antd";
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
  font-size: 130%;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`

const StyledLink = styled(NavLink)`
  font-size: medium;
`

const LandingPage = () => {

  const [user] = useUser();

  return (
    <Row type="flex" justify="center">
      <Col
        xs={{span: 24}}
        sm={{span:18}}
        md={{span: 12, offset: 12}}
        lg={{span:10,offset: 14}}
        xl={{span:8, offset: 16}}
        xxl={{span:6, offset: 18}}>
        <CardContainer>
          <Card
            style={{ width:'90%', borderWidth:'2px', borderRadius:'10px'}}
            bodyStyle={{padding: '3%'}}
          >
            <Meta
              avatar={
                <StyledAvatar
                  icon={<AntDesignOutlined />}
                  size={100}
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
      </Col>
    </Row>
    
  );
}

export default LandingPage;
