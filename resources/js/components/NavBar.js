import React from "react";
import styled from "styled-components";
import {withRouter,NavLink} from "react-router-dom"

const Container = styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: 'Roboto', sans-serif;
    border-bottom: 1px solid #E2E8F0;

`;

const Bar = styled.span`
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    background-color: #101010;


`;

const Hamburger = styled.div`
    display: none;

    @media (max-width: 768px){
        display: block;
        cursor: pointer;

        &:active ${Bar} {
            &:nth-child(2){
                opacity: 0;
            }
            &:nth-child(1){
                transform: translateY(8px) rotate(45deg);
            }
            &:nth-child(3){
                transform: translateY(-8px) rotate(-45deg);
            }
        }
    }
`;


const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
`;

const NavMenu = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px){
        position: fixed;
        left: -100%;
        top: 5rem;
        flex-direction: column;
        background-color: #fff;
        width: 100%;
        border-radius: 10px;
        text-align: center;
        transition: 0.3s;
        box-shadow:
            0 10px 27px rgba(0, 0, 0, 0.05);
    }

    &:active{
        left: 0;
    }
`;
const NavItem = styled.li`
    margin-top: 0.5rem;
    margin-left: 5rem;
    list-style: none;

    @media (max-width: 768px){
       margin: 2.5rem 0;
    }
`;

const SLink = styled(NavLink)`
    font-size: 1.2rem;
    font-weight: 400;
    color: #475569;

    &:hover{
      color: #482ff7;
    }
`;

const TitleLink = styled(NavLink)`
    font-size: 1.5rem;
    font-weight: 500;
    color: #482ff7;
`;


const NavBar = () => {

    return(
        <Container>
            <Nav>
                <TitleLink exact to="/">SoccerApp.</TitleLink>
                <NavMenu>
                    <NavItem>
                        <SLink exact to="/">Home</SLink>
                    </NavItem>
                    <NavItem>
                        <SLink to="/">Add User</SLink>
                    </NavItem>
                    <NavItem>
                        <SLink to="/">Dashboard</SLink>
                    </NavItem>
                </NavMenu>
                <Hamburger>
                    <Bar/>
                    <Bar/>
                    <Bar/>
                </Hamburger>
            </Nav>
        </Container>
    )
};

export default NavBar;

