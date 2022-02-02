import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../slices/modalSlice.js';

const AddChannel = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(hideModal());

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="channelname">
            <Form.Label visuallyHidden>Название канала</Form.Label>
            <Form.Control type="text" placeholder="Введите название" />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={handleClose}>
              Отменить
            </Button>
            <Button variant="primary" type="submit">
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
