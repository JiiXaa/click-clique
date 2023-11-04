import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Upload from '../../assets/upload.png';

import styles from '../../styles/PostCreateEditForm.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import Asset from '../../components/Asset';

function PostCreateForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: '',
    description: '',
    image: null,
  });

  const { title, description, image } = postData;

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
      <Form.Group>
        <Form.Label htmlFor='description'>Description</Form.Label>
        <Form.Control
          as='textarea'
          id='description'
          name='description'
          rows={6}
          placeholder='Enter description'
          className={styles.TextArea}
          value={description}
          onChange={handleChange}
        />
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type='submit'>
        create
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className='py-2 p-0 p-md-2' md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className='text-center'>
              {image ? (
                <>
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
                </>
              ) : (
                <Form.Label
                  className='d-flex justify-content-center'
                  htmlFor='image-upload'
                >
                  <Asset src={Upload} message='Upload an image' />
                </Form.Label>
              )}

              <Form.File
                id='image-upload'
                name='image'
                accept='image/*'
                onChange={handleChangeImage}
              />
            </Form.Group>
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

export default PostCreateForm;