import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Main from './pages/Main.jsx';
import NotFound from './pages/NotFound.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
