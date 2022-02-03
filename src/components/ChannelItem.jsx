import React from 'react';
import {
  Nav, ButtonGroup, Dropdown, Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice';
import { showModal } from '../slices/modalSlice';

const ChannelItem = ({ id, name, removable }) => {
  const { currentChannelId } = useSelector((state) => state.currentChannelIdReducer);
  const dispatch = useDispatch();
  const isActive = id === currentChannelId;
  const handleRemove = () => dispatch(showModal({ type: 'removeChannel', item: { id, name } }));

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

        <Dropdown.Toggle split variant={isActive ? 'secondary' : ''} />

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleRemove}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={() => console.log(2)}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default ChannelItem;
