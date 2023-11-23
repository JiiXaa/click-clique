import styles from '../styles/MoreDropdown.module.css';

import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

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

      <Dropdown.Menu>
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
