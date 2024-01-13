import appStyles from '../../App.module.css';
import { Container } from 'react-bootstrap';

import { useProfileData } from '../../contexts/ProfileDataContext';

import Asset from '../../components/Asset';
import Profile from './Profile';

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

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
