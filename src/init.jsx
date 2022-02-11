import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { AuthProvider } from './contexts/authContext.jsx';
import SocketContext from './contexts/socketContext.js';
import store from './slices/index.js';
import App from './App.jsx';
import ru from './locales/ru.js';
import rollbarConfig from './rollbar.js';
import '../assets/application.scss';
import 'react-toastify/dist/ReactToastify.css';

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
