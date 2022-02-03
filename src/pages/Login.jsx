import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import SignInForm from '../components/SignInForm.jsx';

const Login = () => (
  <>
    <Header />
    <Container>
      <Row className="justify-content-center">
        <Col xs={12}>
          <h1 className="text-center my-4">Войти</h1>
        </Col>
        <Col sm={8} md={6} lg={4} xl={3}>
          <SignInForm />
          <p className="mt-3">
            Нет аккаунта?
            {' '}
            <Link to="/signup">Регистрация</Link>
          </p>
        </Col>
      </Row>
    </Container>
  </>
);

export default Login;
