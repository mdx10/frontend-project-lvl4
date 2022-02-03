import React, { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { hideModal } from '../../slices/modalSlice.js';
import { setCurrentChannelId } from '../../slices/currentChannelIdSlice.js';
import socket from '../../socket.js';

const AddChannel = () => {
  const channelNames = useSelector((state) => state.channelsReducer.channels
    .map(({ name }) => name));

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const dispatch = useDispatch();
  const handleClose = () => dispatch(hideModal());
  const f = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле')
        .notOneOf(channelNames, 'Должно быть уникальным'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      socket.emit('newChannel', values, (res) => {
        if (res.status === 'ok') {
          dispatch(setCurrentChannelId(res.data.id));
          dispatch(hideModal());
        }
      });
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit} autoComplete="off">
          <Form.Group className="mb-3" controlId="channelname">
            <Form.Label visuallyHidden>Название канала</Form.Label>
            <Form.Control
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              name="name"
              type="text"
              placeholder="Введите название"
              isInvalid={f.errors.name}
            />
            {f.errors.name && <Form.Control.Feedback type="invalid">{f.errors.name}</Form.Control.Feedback>}
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