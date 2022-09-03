import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import '../../assets/css/navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../actions/userActions";
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  const userLogin=useSelector(state=>state.userLogin);
  const {userInfo}=userLogin;
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const logoutHandler=()=>{
      dispatch(logout());
      navigate('/')
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="nav">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="head">WEATHER APP</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
              {userInfo?(
                <>
                <NavDropdown title={`${userInfo.user.name}`} id="basic-nav-dropdown">
               <NavDropdown.Item>
                <Nav.Link>
                  <Link to='/profile'>My Profile</Link>
                  </Nav.Link>
               </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={logoutHandler}
                  className="dropitem"
                >
                  <Nav.Link>
                  Logout
                  </Nav.Link>
                </NavDropdown.Item>
                </NavDropdown>
                </>
                
):(
  <>
                <Nav.Link>
                  <Link to='/login'>Login</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to='/register'>Sign Up</Link>
                </Nav.Link>
                </>
)}
              
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
