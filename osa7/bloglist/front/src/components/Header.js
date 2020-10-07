import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../reducers/userReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Header = ({ user }) => {
  const dispatch = useDispatch()
  return (
    <Navbar bg="light-gray" expand="md">
      <Navbar.Brand>Bloglist</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" >
          <Nav.Link href="#" as="span">
            <Link to="/" className="menuItem">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users" className="menuItem">Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span" className="d-md-none">
            <Link to="/" className="menuItem">Logout</Link>
          </Nav.Link>
        </Nav>
        
        {user !== null &&
          <Nav className="d-none d-md-block">
            <span className="pr1">{user.name} logged in</span>
            <Button onClick={() => dispatch(userLogout())} variant="outline-dark" size="sm">logout</Button>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
