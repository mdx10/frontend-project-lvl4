import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ChannelItem from './ChannelItem.jsx';
import { showModal } from '../slices/modalSlice.js';

const Channels = () => {
  const { t } = useTranslation();
  const { channels } = useSelector((state) => state.channelsReducer);
  const dispatch = useDispatch();

  const handleAddChannel = () => dispatch(showModal({ type: 'addChannel' }));

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('chat.channels.title')}</span>
        <Button onClick={handleAddChannel} className="p-0 btn-group-vertical" variant="link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav className="flex-column px-2" fill variant="pills">
        {channels.length > 0 && channels.map(({ id, name, removable }) => (
          <ChannelItem key={id} id={id} name={name} removable={removable} />
        ))}
      </Nav>
    </>
  );
};

export default Channels;
