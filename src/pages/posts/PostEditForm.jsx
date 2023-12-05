import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import styles from '../../styles/PostCreateEditForm.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import Image from 'react-bootstrap/Image';
import { axiosReq } from '../../api/axiosDefaults';
import { Alert } from 'react-bootstrap';

function PostEditForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image: null,
  });

  const { title, content, image } = postData;

  const imageInput = useRef(null);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${postId}/`);
        console.log(data);
        const { title, content, image, is_owner } = data;

        is_owner ? setPostData({ title, content, image }) : navigate(-1);
      } catch (error) {
        console.error(error);
      }
    };
    handleMount();
  }, [postId, navigate]);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleChangeImage = (e) => {
    // if user wants to change the image, remove the old image from the DOM and add the new one
    URL.revokeObjectURL(image);
    if (e.target.files.length) {
      setPostData({
        ...postData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);

    if (imageInput.current.files[0]) {
      formData.append('image', imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${postId}/`, formData);
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.log(error);
      if (error.response?.status !== 401) {
        setErrors(error.response?.data);
      } else {
        alert('You are not authorized to perform this action.');
      }
    }
  };

  const navigateBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  const textFields = (
    <div className='text-center'>
      <Form.Group>
        <Form.Label htmlFor='title'>Title</Form.Label>
        <Form.Control
          type='text'
          id='title'
          name='title'
          placeholder='Enter title'
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((errorMsg, idx) => (
        <Alert key={idx} variant='warning'>
          {errorMsg}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label htmlFor='description'>Description</Form.Label>
        <Form.Control
          as='textarea'
          id='description'
          name='content'
          rows={6}
          placeholder='Enter description'
          className={styles.TextArea}
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((errorMsg, idx) => (
        <Alert key={idx} variant='warning'>
          {errorMsg}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => navigateBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type='submit'>
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className='py-2 p-0 p-md-2' md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className='text-center'>
              <figure>
                <Image
                  className={appStyles.Image}
                  src={image}
                  alt='Post'
                  rounded
                />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor='image-upload'
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.Control
                type='file'
                id='image-upload'
                name='image'
                accept='image/*'
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((errorMsg, idx) => (
              <Alert key={idx} variant='warning'>
                {errorMsg}
              </Alert>
            ))}

            <div className='d-md-none'>{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className='d-none d-md-block p-0 p-md-2'>
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;
