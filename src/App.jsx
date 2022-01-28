import React from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Main from './pages/Main.jsx';
import NotFound from './pages/NotFound.jsx';
import { AutnProvider } from './contexts/authContext.jsx';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    user && user.token ? children : <Navigate to="/login" state={{ from: location }} replace />
  );
};

const App = () => (
  <AutnProvider>
    <Routes>
      <Route
        path="/"
        element={(
          <RequireAuth>
            <Main />
          </RequireAuth>
        )}
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AutnProvider>
);

export default App;
