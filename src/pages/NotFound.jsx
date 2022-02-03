import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';

const NotFound = () => (
  <>
    <Header />
    <Container className="text-center">
      <h1 className="my-5">Page not found</h1>
      <Link to="/">На главную</Link>
    </Container>
  </>
);

export default NotFound;
