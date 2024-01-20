import styles from '../styles/MoreDropdown.module.css';

import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDotsToggle = React.forwardRef(({ onClick }, ref) => (
  <i
    className='fas fa-ellipsis-v'
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className='ml-auto' drop='left'>
      <Dropdown.Toggle as={ThreeDotsToggle} />

      <Dropdown.Menu className='text-center'>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          //  * Accessibility for screen readers.
          aria-label='Edit Post'
        >
          <i className='fas fa-edit' />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          //  * Accessibility for screen readers.
          aria-label='Delete Post'
        >
          <i className='fas fa-trash-alt' />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ProfileEditDropdown = ({ id }) => {
  const navigate = useNavigate();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop='left'>
      <Dropdown.Toggle as={ThreeDotsToggle} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => navigate(`/profiles/${id}/edit`)}
          aria-label='edit-profile'
        >
          <i className='fas fa-edit' /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => navigate(`/profiles/${id}/edit/username`)}
          aria-label='edit-username'
        >
          <i className='far fa-id-card' />
          change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => navigate(`/profiles/${id}/edit/password`)}
          aria-label='edit-password'
        >
          <i className='fas fa-key' />
          change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
