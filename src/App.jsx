import React from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/scss/main.scss';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Chat from './pages/Chat.jsx';
import NotFound from './pages/NotFound.jsx';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    user && user.token ? children : <Navigate to="/login" state={{ from: location }} replace />
  );
};

const App = () => (
  <>
    <Routes>
      <Route
        path="/"
        element={(
          <RequireAuth>
            <Chat />
          </RequireAuth>
        )}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <ToastContainer />
  </>
);

export default App;
