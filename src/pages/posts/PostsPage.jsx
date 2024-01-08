import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Post from './Post';
import PopularProfiles from '../profiles/PopularProfiles';

import appStyles from '../../App.module.css';
import styles from '../../styles/PostsPage.module.css';

import NoResults from '../../assets/no-results.png';
import Asset from '../../components/Asset';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';

function PostsPage({ message, filter = '' }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState('');

  // * If the user navigates to a different page, reset the query state
  useEffect(() => {
    setQuery('');
  }, [pathname]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // * query accepts a post title or post user username
        const { data } = await axiosRes.get(`/posts/?${filter}search=${query}`);
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

    const debounceTimer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className='h-100'>
      <Col className='py-2 p-0 p-lg-2' lg={8}>
        <p>Popular profiles mobile</p>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form className={styles.SearchBar} onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type='text'
            className='mr-sm-2'
            placeholder='Search posts'
          />
        </Form>

        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              >
                {posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
              </InfiniteScroll>
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
        {/* ADD IN DOCS: Most followed profiles (does not get rerendered when user navigates
        between Home, Feed and Liked pages as it is same component located in
        App component) */}
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;
