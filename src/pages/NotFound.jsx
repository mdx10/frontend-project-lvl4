import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Container className="text-center">
        <h1 className="my-5">{t('notFound.title')}</h1>
        <Link to="/">{t('notFound.homeLink')}</Link>
      </Container>
    </>
  );
};

export default NotFound;
