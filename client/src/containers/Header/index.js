import React from 'react';
import {Navbar, NavbarBrand, Input, Nav, NavItem, Button, Container} from 'reactstrap'
import './Header.scss'
import LoggedIn from './LoggedIn';
import Login from './Login/'
import {useSelector} from 'react-redux'
import {loginUser$} from '../../redux/selectors/'
function Header(){

    const {token} = useSelector(loginUser$);

    return (
        <header className="header">
            <Container style={{paddingLeft: '0px', paddingRight: '0px'}}>
                <Navbar light>
                    <Nav>
                        <NavItem>
                            <NavbarBrand href="/" className='header__logo'>VanTiennn</NavbarBrand>
                        </NavItem>
                        <NavItem>
                            <Input className="header__search" placeholder="Search..."></Input>
                        </NavItem>
                        <NavItem>
                            <Button className="ml-8">Search</Button>
                        </NavItem>
                    </Nav>
                    {(token) ? <LoggedIn/> : <Login/>}                
                </Navbar>
            </Container>
        </header>

    )
}

export default Header;