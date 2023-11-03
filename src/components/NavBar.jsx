import { NavLink } from 'react-router-dom';

import { Container, Navbar, Nav } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';

import {
  useCurrentUser,
  useSetCurrentUser,
} from '../contexts/CurrentUserContext';

import axios from 'axios';

import Avatar from './Avatar';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { menuExpanded, setMenuExpanded, menuRef } = useClickOutsideToggle();

  const handleUserSignOut = async () => {
    try {
      await axios.post('http://localhost:8000/dj-rest-auth/logout/');
      setCurrentUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const addPostIcon = (
    <NavLink
      className={({ isActive }) =>
        `${styles.NavLink} ${isActive ? styles.NavActive : ''}`
      }
      to='/posts/create'
    >
      <i className='fas fa-plus-square'></i> Add Post
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink
        className={({ isActive }) =>
          `${styles.NavLink} ${isActive ? styles.NavActive : ''}`
        }
        to='/feed'
      >
        <i className='fas fa-stream'></i> Feed
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${styles.NavLink} ${isActive ? styles.NavActive : ''}`
        }
        to='/liked'
      >
        <i className='fas fa-heart'></i> Liked
      </NavLink>
      <NavLink className={styles.NavLink} to='/' onClick={handleUserSignOut}>
        <i className='fas fa-sign-out-alt'></i> Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text='Profile' height={40} />
      </NavLink>
    </>
  );

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
    <Navbar
      expanded={menuExpanded}
      className={styles.NavBar}
      expand='md'
      fixed='top'
    >
      <Container>
        <NavLink to='/'>
          <Navbar.Brand>LOGO</Navbar.Brand>
        </NavLink>
        {currentUser ? addPostIcon : ''}
        <Navbar.Toggle
          ref={menuRef}
          onClick={() => setMenuExpanded(!menuExpanded)}
          aria-controls='basic-navbar-nav'
        />
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
