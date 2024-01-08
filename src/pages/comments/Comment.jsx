import { useState } from 'react';

import { Card, Row, Col, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import styles from '../../styles/Comment.module.css';
import { MoreDropdown } from '../../components/MoreDropdown';
import CommentEditForm from './CommentEditForm';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    content,
    updated_at,
    id,
    setPost,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <hr />
      <Card>
        <Container>
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
                {showEditForm ? (
                  <CommentEditForm
                    id={id}
                    profile_id={profile_id}
                    content={content}
                    profile_image={profile_image}
                    setShowEditForm={setShowEditForm}
                    setComments={setComments}
                  />
                ) : (
                  <p>{content}</p>
                )}
              </Card.Body>
            </Col>
            <Col xs='auto' className='ms-auto'>
              {is_owner && !showEditForm && (
                <MoreDropdown
                  handleEdit={() => {
                    setShowEditForm(true);
                  }}
                  handleDelete={handleDelete}
                />
              )}
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

export default Comment;
