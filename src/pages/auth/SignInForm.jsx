import React, { useContext, useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

import { Link, useNavigate } from 'react-router-dom';

import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';

import cameraImg from '../../assets/camera002.webp';
import { SetCurrentUserContext } from '../../App';

function SignInForm() {
  const setCurrentUser = useContext(SetCurrentUserContext);

  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        'http://localhost:8000/dj-rest-auth/login/',
        signInData
      );
      setCurrentUser(data.user);
      navigate('/');
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Row className={styles.Row}>
      <Col className='my-auto p-0 p-md-2' md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign in</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='username'>
              <Form.Label className='d-none'>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Username'
                name='username'
                className={styles.Input}
                value={username}
                onChange={handleChange}
              />
            </Form.Group>

            {errors?.username?.map((errorMsg, idx) => (
              <Alert key={idx} variant='warning'>
                {errorMsg}
              </Alert>
            ))}

            <Form.Group controlId='password'>
              <Form.Label className='d-none'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                className={styles.Input}
                value={password}
                onChange={handleChange}
              />
            </Form.Group>

            {errors?.password?.map((errorMsg, idx) => (
              <Alert key={idx} variant='warning'>
                {errorMsg}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type='submit'
            >
              Sign in
            </Button>

            {errors?.non_field_errors?.map((errorMsg, idx) => (
              <Alert key={idx} variant='warning' className='mt-3'>
                {errorMsg}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to='/signup'>
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image className={`${appStyles.FillerImage}`} src={cameraImg} />
      </Col>
    </Row>
  );
}

export default SignInForm;
