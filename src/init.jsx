import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { AuthProvider } from './contexts/authContext.jsx';
import SocketContext from './contexts/socketContext.js';
import store from './slices/index.js';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
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

  filter.add(filter.getDictionary('ru'));

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
  });
  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(renameChannel({ id, name }));
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
