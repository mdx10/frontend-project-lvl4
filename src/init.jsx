import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
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
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <SocketContext.Provider value={socket}>
              <App />
            </SocketContext.Provider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default init;
