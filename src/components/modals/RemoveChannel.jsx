import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../slices/modalSlice.js';
import socket from '../../socket.js';

const AddChannel = () => {
  const { modalInfo } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(hideModal());
  const handleRemove = () => {
    socket.emit('removeChannel', modalInfo.item, (res) => {
      if (res.status === 'ok') {
        handleClose();
      }
    });
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          Канал
          {' '}
          <b>{modalInfo.item.name}</b>
          {' '}
          будет удален. Вы уверены?
        </p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button onClick={handleRemove} variant="danger" type="submit">
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
