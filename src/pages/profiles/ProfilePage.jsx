import { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import Asset from '../../components/Asset';

import styles from '../../styles/ProfilePage.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import PopularProfiles from './PopularProfiles';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';

import { useParams } from 'react-router-dom';
import {
  useProfileData,
  useSetProfileData,
} from '../../contexts/ProfileDataContext';

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { profileId } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  console.log('profile', profile);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }] = await Promise.all([
          axiosRes.get(`/profiles/${profileId}/`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setHasLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [profileId, setProfileData]);

  const mainProfile = (
    <>
      <Row className='px-3 text-center'>
        <Col lg={3} className='text-lg-left'>
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className='m-2'>{profile?.owner}</h3>
          <Row className='justify-content-center g-0'>
            <Col xs={3} className='my-2'>
              <div>{profile?.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className='my-2'>
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className='my-2'>
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className='text-lg-right'>
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => console.log('unfollow')}
                type='button'
              >
                Unfollow
              </button>
            ) : (
              <button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => console.log('follow')}
                type='button'
              >
                Follow
              </button>
            ))}
        </Col>
        {profile?.content && <Col className='p-3'>{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className='text-center'>Profile owner's posts</p>
      <hr />
    </>
  );

  return (
    <Row>
      <Col className='py-2 p-0 p-lg-2' lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className='d-none d-lg-block p-0 p-lg-2'>
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
