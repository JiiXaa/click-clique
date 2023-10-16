import { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import axios from 'axios';
import './api/axiosDefaults';

import styles from './App.module.css';
import Container from 'react-bootstrap/Container';

import NavBar from './components/NavBar';

import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
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
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Routes>
              <Route path='/' element={<h1>Home page</h1>} />
              <Route path='/signin' element={<SignInForm />} />
              <Route path='/signup' element={<SignUpForm />} />
              {/* 404 Route */}
              <Route path='*' element={<h1>404 Not Found</h1>} />
            </Routes>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
