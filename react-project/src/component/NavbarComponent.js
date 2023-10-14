import axios from 'axios';
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Nav, Navbar, NavbarBrand, NavbarText, NavItem } from 'reactstrap'


const NavbarComponent = () => {
  const sessionUsername = sessionStorage.getItem("sessionUsername");
  const logged_in = sessionStorage.getItem("logged_in");
  const linkStyle = {
    textDecoration: 'none',
    margin: '2px'
  };
  return (
    <div>
        <Navbar color='dark' dark>
          <NavbarBrand>
            <NavbarText>
              <Link to='/' style={{textDecoration: 'none'}}>Postify</Link>
            </NavbarText>
          </NavbarBrand>
          {(logged_in) ? 
          <Nav>
            <NavItem>
              <Link style={linkStyle} to={"/"}>{sessionUsername}</Link>
            </NavItem>
            <NavItem>
              <Link style={linkStyle} to={"/login"} onClick={() => {axios.post("/logout")}}>Çıkış Yap</Link>
            </NavItem>
            
          </Nav>
          :
          <Nav>
            <NavItem><Link to={"/register"} style={linkStyle}>Kayıt Ol</Link></NavItem>
            <NavItem><Link to={"/login"} style={linkStyle}>Giriş Yap</Link></NavItem>
          </Nav>
          }
        </Navbar>
        <Outlet/>
    </div>
  )
}

export default NavbarComponent