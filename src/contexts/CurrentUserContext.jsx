import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { removeTokenTimestamp, shouldRefreshToken } from '../utils/utils';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleUserMount = async () => {
    try {
      const { data } = await axiosRes.get(
        'http://localhost:8000/dj-rest-auth/user/'
      );
      setCurrentUser(data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setCurrentUser(null);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    handleUserMount();
  }, []);

  useMemo(() => {
    // Add interceptor to axiosReq to refresh token if it is expired, if it is expired and there is previous user, navigate to signin page.

    axiosReq.interceptors.response.use(
      async (config) => {
        if (shouldRefreshToken) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (error) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate('/signin');
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    // Add interceptor to axiosRes to refresh token if it is expired, and then retry the request. Added in useMemo as it runs once on mount.
    axiosRes.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (error) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate('/signin');
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axiosRes(error.config);
        }
        return Promise.reject(error);
      }
    );
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
