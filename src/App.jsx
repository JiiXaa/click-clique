import { Routes, Route } from 'react-router-dom';

import './api/axiosDefaults';

import styles from './App.module.css';
import Container from 'react-bootstrap/Container';

import NavBar from './components/NavBar';

import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';

import { useCurrentUser } from './contexts/CurrentUserContext';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || '';

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route
            path='/'
            element={
              <PostsPage message='No results found. Adjust the search keyword.' />
            }
          />
          <Route
            path='/feed'
            element={
              <PostsPage
                message='No results found. Adjust the search keyword or follow a user.'
                filter={`owner__followed__owner__profile=${profile_id}`}
              />
            }
          />
          <Route
            path='/liked'
            element={
              <PostsPage
                message='No results found. Adjust the search keyword or like a post.'
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            }
          />
          <Route path='/signin' element={<SignInForm />} />
          <Route path='/signup' element={<SignUpForm />} />
          <Route path='/posts/create' element={<PostCreateForm />} />
          <Route path='/posts/:postId' element={<PostPage />} />
          {/* 404 Route */}
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
