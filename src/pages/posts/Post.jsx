import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Post.module.css';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  console.log(postPage);

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <div className='d-flex align-items-center justify-content-between'>
          <Link
            to={`/profiles/${profile_id}`}
            className='d-flex align-items-center'
          >
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className='d-flex align-items-center'>
            <span>{updated_at}</span>
            {is_owner && postPage && '...'}
          </div>
        </div>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className='text-center'>{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement='top'
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className='far fa-heart' />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => {}}>
              <i className={`far fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement='top'
              overlay={<Tooltip>Log in to like this post!</Tooltip>}
            >
              <i className='far fa-heart' />
            </OverlayTrigger>
          )}
          <span>{likes_count}</span>
          <Link to={`/posts/${id}`}>
            <i className='far fa-comment' />
          </Link>
          <span>{comments_count}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
