import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom'
import { Nav, Navbar, NavbarBrand, NavbarText, NavItem } from 'reactstrap'
import { authActions } from '../redux/authSlice';


const NavBar = () => {
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const linkStyle = {
    textDecoration: 'none',
    margin: '2px'
  };
  return (
    <>
        <Navbar color='dark' dark>
          <NavbarBrand>
            <NavbarText>
              <Link to='/' style={{textDecoration: 'none'}}>Postify</Link>
            </NavbarText>
          </NavbarBrand>
          {(authUser) ? 
          <Nav style={{gap: 20}}>
            <NavItem>
              <a style={linkStyle} href={`/user/${authUser?.id}`}>{authUser?.username}</a>
            </NavItem>
            <NavItem>
              <Link style={linkStyle} to={"/login"} onClick={() => {dispatch(authActions.logout())}}>Çıkış Yap</Link>
            </NavItem>
            
          </Nav>
          :
          <Nav style={{gap: 10}}>
            <NavItem><Link to={"/register"} style={linkStyle}>Kayıt Ol</Link></NavItem>
            <NavItem><Link to={"/login"} style={linkStyle}>Giriş Yap</Link></NavItem>
          </Nav>
          }
        </Navbar>
        <Outlet/>
    </>
  )
}

export default NavBar