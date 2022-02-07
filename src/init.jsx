import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { AuthProvider } from './contexts/authContext.jsx';
import SocketContext from './contexts/socketContext.js';
import store from './slices/index.js';
import '../assets/application.scss';
import App from './App.jsx';
import ru from './locales/ru.js';

const rollbarConfig = {
  accessToken: '26e49ddc069544f38195dde6d96d2ac0',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

const init = async (socket) => {
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: false,
      resources: {
        ru,
      },
    });

  return (
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
};

export default init;
