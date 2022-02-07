import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { hideModal } from '../../slices/modalSlice.js';
import socket from '../../socket.js';

const AddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { modalInfo: { item } } = useSelector((state) => state.modalReducer);

  const handleClose = () => dispatch(hideModal());

  const notify = () => toast.success(t('feedback.success.removeChannel'));

  const handleRemove = () => {
    socket.emit('removeChannel', item, (res) => {
      if (res.status === 'ok') {
        handleClose();
        notify();
      }
    });
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          {t('modals.remove.body', { name: item.name })}
        </p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={handleClose}>
            {t('modals.buttons.cancel')}
          </Button>
          <Button onClick={handleRemove} variant="danger" type="submit">
            {t('modals.buttons.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
