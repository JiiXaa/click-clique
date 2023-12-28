import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import styles from '../../styles/Comment.module.css';

const Comment = (props) => {
  const { profile_id, profile_image, owner, content, updated_at } = props;

  return (
    <div>
      <hr />
      <Card>
        <Row className='align-items-center'>
          <Col xs='auto'>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} />
            </Link>
          </Col>
          <Col>
            <Card.Body>
              <span className={styles.Owner}>{owner}</span>
              <span className={styles.Date}>{updated_at}</span>
              <p>{content}</p>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Comment;
