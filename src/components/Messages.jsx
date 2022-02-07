import React, { useState, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { addMessage } from '../slices/messagesSlice.js';
import useAuth from '../hooks/useAuth.js';
import useSocket from '../hooks/useSocket.js';

const Messages = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const socket = useSocket();

  const { currentChannelId } = useSelector((state) => state.currentChannelIdReducer);
  const currentChannelName = useSelector((state) => {
    const currentChannel = state.channelsReducer.channels.find(({ id }) => id === currentChannelId);
    return currentChannel?.name;
  });
  const messages = useSelector((state) => {
    const currentMessages = state.messagesReducer.messages
      .filter(({ channelId }) => channelId === currentChannelId);
    return currentMessages;
  });

  useEffect(() => {
    filter.loadDictionary('ru');

    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
      console.log(message);
    });
    return () => socket.removeAllListeners('newMessage');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      const message = {
        body: filter.clean(text),
        channelId: currentChannelId,
        username: user.username,
      };
      socket.emit('newMessage', message);
      setText('');
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {' '}
            {currentChannelName}
          </b>
        </p>
        <span className="text-muted">
          {t('chat.messages.messagesCount', { count: messages.length })}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messages.length > 0 && messages.map(({ id, body, username }) => (
          <div className="text-break mb-2" key={id}>
            <b>{username}</b>
            {': '}
            {body}
          </div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Form onSubmit={handleSubmit} className="py-1 border rounded-2" autoComplete="off">
          <InputGroup hasValidation>
            <Form.Control
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border-0 p-0 ps-2"
              name="body"
              type="text"
              placeholder={t('chat.form.text')}
              aria-label={t('chat.form.text')}
            />
            <button type="submit" className="btn btn-group-vertical" disabled="">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
            </button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default Messages;
