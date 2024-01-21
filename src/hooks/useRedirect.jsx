import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        // Don't need to use axiosRes here because we are not sending any data, just checking if the user is authenticated
        const test = await axios.post('/dj-rest-auth/token/refresh/');
        console.log(test);
        // If the user is authenticated, redirect to the home page
        if (userAuthStatus === 'loggedIn') {
          navigate('/');
        }
      } catch (err) {
        // If the user is not authenticated, redirect to the home page
        if (userAuthStatus === 'loggedOut') {
          navigate('/');
        }
      }
    };

    handleMount();
  }, [navigate, userAuthStatus]);
};
