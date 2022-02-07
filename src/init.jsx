import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Rollbar from '@rollbar/react';
import { AuthProvider } from './contexts/authContext.jsx';
import SocketContext from './contexts/socketContext.js';
import store from './slices/index.js';
import '../assets/application.scss';
import './i18n.js';
import App from './App.jsx';
// import socket from './socket.js';

const rollbarConfig = {
  accessToken: '26e49ddc069544f38195dde6d96d2ac0',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

const init = (socket) => (
  <Rollbar.Provider config={rollbarConfig}>
    <Rollbar.ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <SocketContext.Provider value={socket}>
              <App />
            </SocketContext.Provider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </Rollbar.ErrorBoundary>
  </Rollbar.Provider>
);

export default init;
