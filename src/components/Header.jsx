import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';

const Header = () => {
  const { user, logOut } = useAuth();
  const { t } = useTranslation();
  return (
    <Navbar className="shadow-sm" expand="lg" bg="white" variant="light">
      <Container>
        <Link className="navbar-brand" to="/">{t('header.logo')}</Link>
        {user && (
          <div className="d-flex align-items-center">
            <span className="me-2">{user.username}</span>
            <Button onClick={() => logOut()}>{t('header.logOutBtn')}</Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
