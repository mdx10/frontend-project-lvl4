import React from 'react';
import {
  Nav, ButtonGroup, Dropdown, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice';
import { showModal } from '../slices/modalSlice';

const ChannelItem = ({ id, name, removable }) => {
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.currentChannelIdReducer);
  const dispatch = useDispatch();
  const isActive = id === currentChannelId;
  const handleRemove = () => dispatch(showModal({ type: 'removeChannel', item: { id, name } }));
  const handleRename = () => dispatch(showModal({ type: 'renameChannel', item: { id, name } }));

  if (!removable) {
    return (
      <Nav.Item className="w-100">
        <Button className="w-100 rounded-0 text-start" variant={isActive ? 'secondary' : ''} onClick={() => dispatch(setCurrentChannelId(id))}>
          <span className="me-1">#</span>
          {name}
        </Button>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item className="w-100">
      <Dropdown className="d-flex" as={ButtonGroup}>
        <Button className="w-100 rounded-0 text-start" variant={isActive ? 'secondary' : ''} onClick={() => dispatch(setCurrentChannelId(id))}>
          <span className="me-1">#</span>
          {name}
        </Button>

        <Dropdown.Toggle split variant={isActive ? 'secondary' : ''}>
          <span className="visually-hidden">{t('chat.channels.btnGroup')}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleRemove}>{t('chat.channels.removeBtn')}</Dropdown.Item>
          <Dropdown.Item onClick={handleRename}>{t('chat.channels.renameBtn')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default ChannelItem;
