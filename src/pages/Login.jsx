import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header.jsx';
import SignInForm from '../components/SignInForm.jsx';
import routes from '../routes.js';

const Login = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <Container>
        <Row className="justify-content-center">
          <Col xs={12}>
            <h1 className="text-center my-4">{t('signin.title')}</h1>
          </Col>
          <Col sm={8} md={6} lg={4} xl={3}>
            <SignInForm />
            <p className="mt-3">
              {t('signin.noAccount')}
              {' '}
              <Link to={routes.signupPagePath()}>{t('signin.registrationLink')}</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
