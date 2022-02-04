import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header.jsx';
import SignUpForm from '../components/SignUpForm.jsx';

const SignUp = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Container>
        <Row className="justify-content-center">
          <Col xs={12}>
            <h1 className="text-center my-4">{t('signup.title')}</h1>
          </Col>
          <Col sm={8} md={6} lg={4} xl={3}>
            <SignUpForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
