import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Post from './Post';

import appStyles from '../../App.module.css';
import styles from '../../styles/PostsPage.module.css';

import NoResults from '../../assets/no-results.png';
import Asset from '../../components/Asset';

function PostsPage({ message, filter = '' }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosRes.get(`/posts/?${filter}`);
        console.log(data);
        setPosts(data);
        setHasLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    // * If the pathname changes, reset the hasLoaded state to false
    // * If the user is on the home page, fetch all posts. Otherwise, fetch posts based on the filter.
    setHasLoaded(false);
    fetchPosts();
  }, [filter, pathname]);

  return (
    <Row className='h-100'>
      <Col className='py-2 p-0 p-lg-2' lg={8}>
        <p>Popular profiles mobile</p>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              posts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} alt='No results' />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className='d-none d-lg-block p-0 p-lg-2'>
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default PostsPage;
