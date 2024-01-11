import { useEffect, useState } from 'react';

import appStyles from '../../App.module.css';

import { Container } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Asset from '../../components/Asset';
import Profile from './Profile';

const PopularProfiles = ({ mobile }) => {
  const [profileData, setProfileData] = useState({
    // * Both profile states are in same state to keep them in sync.
    // !!! add pageProfile later.
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const { popularProfiles } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get(
          '/profiles/?ordering=-followers_count'
        );
        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          popularProfiles: data,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    handleMount();
  }, [currentUser]);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && 'd-lg-none text-center mb-3'
      }`}
    >
      {popularProfiles.results.length ? (
        <>
          <p className='mb-3'>Popular Profiles:</p>
          {mobile ? (
            <div className='d-flex justify-content-around'>
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <div key={profile.id}>
                  <Profile key={profile.id} profile={profile} mobile />
                </div>
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              <div key={profile.id}>
                <Profile key={profile.id} profile={profile} />
              </div>
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
