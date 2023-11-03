import { useEffect, useRef, useState } from 'react';

const useClickOutsideToggle = () => {
  // Burger menu state and ref
  const [menuExpanded, setMenuExpanded] = useState(false);
  const menuRef = useRef(null);

  // Close burger menu when clicking outside of it (on mobile) or when clicking on a link (on desktop)
  useEffect(() => {
    const handleClickOutside = (e) => {
      // If menu is expanded and the click is outside of the menu, close the menu
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuExpanded(false);
      }
    };
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [menuRef]);

  return { menuExpanded, setMenuExpanded, menuRef };
};

export default useClickOutsideToggle;
