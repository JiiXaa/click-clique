import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { Container, Navbar, Nav } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';

import { CurrentUserContext } from '../App';

const NavBar = () => {
  const currentUser = useContext(CurrentUserContext);
  const loggedInIcons = <>{currentUser?.username}</>;
  const loggedOutIcons = (
    <>
      <NavLink
        className={({ isActive }) =>
          `${styles.NavLink} ${isActive ? styles.NavActive : ''}`
        }
        to='/signin'
      >
        <i className='fas fa-sign-in-alt'></i> Sign in
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${styles.NavLink} ${isActive ? styles.NavActive : ''}`
        }
        to='/signup'
      >
        <i className='fas fa-user-plus'></i> Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand='md' fixed='top'>
      <Container>
        <NavLink to='/'>
          <Navbar.Brand>LOGO</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto text-right'>
            <NavLink
              className={({ isActive }) =>
                `${styles.NavLink} ${isActive ? styles.NavActive : ''}`
              }
              to='/'
            >
              <i className='fas fa-home'></i> Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
