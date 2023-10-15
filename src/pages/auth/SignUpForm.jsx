import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';

import cameraImg from '../../assets/camera001.webp';

import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from 'react-bootstrap';
import axios from 'axios';

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: '',
  });

  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  let navigate = useNavigate();

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:8000/dj-rest-auth/registration/',
        signUpData
      );
      navigate('/signin');
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className='my-auto py-2 p-md-2' md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='username'>
              <Form.Label className='d-none'>Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type='text'
                placeholder='Username'
                name='username'
                value={username}
                onChange={handleChange}
              />
            </Form.Group>

            {errors.username?.map((errorMsg, idx) => (
              <Alert key={idx} variant='warning'>
                {errorMsg}
              </Alert>
            ))}

            <Form.Group controlId='password1'>
              <Form.Label className='d-none'>Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type='password'
                placeholder='Password'
                name='password1'
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>

            {errors.password1?.map((errorMsg, idx) => (
              <Alert key={idx} variant='warning'>
                {errorMsg}
              </Alert>
            ))}

            <Form.Group controlId='password2'>
              <Form.Label className='d-none'>Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type='password'
                placeholder='Confirm password'
                name='password2'
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>

            {errors.password2?.map((errorMsg, idx) => (
              <Alert key={idx} variant='warning'>
                {errorMsg}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type='submit'
            >
              Submit
            </Button>

            {errors.non_field_errors?.map((errorMsg, idx) => (
              <Alert key={idx} variant='warning' className='mt-3'>
                {errorMsg}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to='/signin'>
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image className={`${appStyles.FillerImage}`} src={cameraImg} />
      </Col>
    </Row>
  );
};

export default SignUpForm;
