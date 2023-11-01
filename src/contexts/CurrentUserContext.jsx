import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleUserMount = async () => {
    try {
      const { data } = await axios.get(
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
