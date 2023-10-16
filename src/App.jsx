import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Container from 'react-bootstrap/Container';

import NavBar from './components/NavBar';

import './api/axiosDefaults';

import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';

function App() {
  return (
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
  );
}

export default App;
