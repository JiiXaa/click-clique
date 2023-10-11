import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Container from 'react-bootstrap/Container';

import NavBar from './components/NavBar';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route path='/' element={<h1>Home page</h1>} />
          <Route path='/signin' element={<h1>Sign in</h1>} />
          <Route path='/signup' element={<h1>Sign up</h1>} />
          {/* 404 Route */}
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
