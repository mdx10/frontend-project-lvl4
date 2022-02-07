import React, { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { hideModal } from '../../slices/modalSlice.js';
import socket from '../../socket.js';

const RenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const { modalInfo: { item } } = useSelector((state) => state.modalReducer);
  const channelNames = useSelector((state) => state.channelsReducer.channels
    .map(({ name }) => name));

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const handleClose = () => dispatch(hideModal());
  const notify = () => toast.success(t('feedback.success.renameChannel'));

  const f = useFormik({
    initialValues: {
      name: item.name,
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(3, t('feedback.errors.minMax', { min: 3, max: 20 }))
        .max(20, t('feedback.errors.minMax', { min: 3, max: 20 }))
        .required(t('feedback.errors.required'))
        .notOneOf(channelNames, t('feedback.errors.mustBeUnique')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        id: item.id,
      };
      socket.emit('renameChannel', data, (res) => {
        if (res.status === 'ok') {
          dispatch(hideModal());
          notify();
        }
      });
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit} autoComplete="off">
          <Form.Group className="mb-3" controlId="channelname">
            <Form.Label visuallyHidden>{t('modals.rename.body')}</Form.Label>
            <Form.Control
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              name="name"
              type="text"
              placeholder={t('modals.rename.body')}
              isInvalid={f.errors.name}
            />
            {f.errors.name && <Form.Control.Feedback type="invalid">{f.errors.name}</Form.Control.Feedback>}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={handleClose}>
              {t('modals.buttons.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('modals.buttons.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
