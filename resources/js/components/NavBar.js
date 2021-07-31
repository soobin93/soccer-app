import React, {useState} from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom"
import {useUser} from "components/contexts/UserContext";
import UserApi from "api/UserApi";

const Container = styled.div`
  margin-bottom: 20px;
  padding: 0;
  box-sizing: border-box;
  font-size: 15%;
  font-family: 'Roboto', sans-serif;
  border-bottom: 1px solid #E2E8F0;
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background: #101010;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 860px) {
    display: flex;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 2rem;
`;

const NavMenu = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 860px) {
    padding-left: 0;
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({isOpen}) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
  }
`;

const MenuItem = styled.li`
  margin-top: 0.5rem;
  margin-left: 5rem;
  list-style: none;

  @media (max-width: 860px) {
    margin: 1rem 0;
    text-align: center;
  }
`;

const MenuLink = styled(NavLink)`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #475569;
  transition: all 0.3s ease-in;
  font-size: 1.2rem;
  font-weight: 300;

  &:hover, &:focus {
    color: #482ff7;
  }
`;

const LogInLink = styled(MenuLink)`
  color: #2f54eb;
`;

const LogOutLink = styled(MenuLink)`
  color: red;
`;

const TitleLink = styled(NavLink)`
  padding: 1rem 0;
  text-decoration: none;
  font-size: 1.7rem;
  font-weight: 800;
  color: #482ff7;
`;

const NavBar = () => {
  const [user, setUser] = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const logUser = () => {
    setIsOpen(!isOpen);

    if (user) {
      UserApi.logout().then(function (response) {
        location.reload();
      });
    }
  }

  return (
    <Container>
      <Nav>
        <TitleLink exact to="/">SoccerApp.</TitleLink>

        <Hamburger onClick={() => setIsOpen(!isOpen)}>
          <span/>
          <span/>
          <span/>
        </Hamburger>

        <NavMenu isOpen={isOpen}>
          {user ? (
            <MenuItem>
              <MenuLink to="/profile" onClick={() => setIsOpen(!isOpen)}>Profile</MenuLink>
            </MenuItem>
          ) : null}


          {user && user.admin === 1 ? (
            <MenuItem>
              <MenuLink to="/admin" onClick={() => setIsOpen(!isOpen)}>Admin</MenuLink>
            </MenuItem>
          ) : null}

          <MenuItem>
            {
              !user
                ? <LogInLink to="/login" onClick={logUser}>Log In</LogInLink>
                : <LogOutLink to="/login" onClick={logUser}>Log Out</LogOutLink>
            }
          </MenuItem>
        </NavMenu>
      </Nav>
    </Container>
  )
};

export default NavBar;
