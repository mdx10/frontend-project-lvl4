import React from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Chat from './pages/Chat.jsx';
import NotFound from './pages/NotFound.jsx';
import routes from './routes.js';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    user && user.token
      ? children
      : <Navigate to={routes.loginPagePath()} state={{ from: location }} replace />
  );
};

const App = () => (
  <>
    <Routes>
      <Route
        path={routes.homePagePath()}
        element={(
          <RequireAuth>
            <Chat />
          </RequireAuth>
        )}
      />
      <Route path={routes.loginPagePath()} element={<Login />} />
      <Route path={routes.signupPagePath()} element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <ToastContainer />
  </>
);

export default App;
