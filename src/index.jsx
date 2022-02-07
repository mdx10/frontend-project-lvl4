import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Rollbar from '@rollbar/react';
import { AuthProvider } from './contexts/authContext.jsx';
import store from './slices/index.js';
import '../assets/application.scss';
import './i18n.js';
import App from './App.jsx';

const rollbarConfig = {
  accessToken: '26e49ddc069544f38195dde6d96d2ac0',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <Rollbar.Provider config={rollbarConfig}>
          <Rollbar.ErrorBoundary>
            <App />
          </Rollbar.ErrorBoundary>
        </Rollbar.Provider>
      </AuthProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('chat'),
);
