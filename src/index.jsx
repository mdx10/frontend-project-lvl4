import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from './contexts/authContext.jsx';
import store from './slices/index.js';
import '../assets/application.scss';
import './i18n.js';
import App from './App.jsx';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('chat'),
);
