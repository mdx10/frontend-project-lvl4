/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  username: yup.string().required('Введите ник'),
  password: yup.string().required('Введите пароль'),
});

const handleSubmit = (values) => {
  console.log(values);
};

const SignInForm = () => {
  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Form onSubmit={f.handleSubmit} className="m-auto" style={{ maxWidth: '350px' }} autoComplete="off">
      <Form.FloatingLabel className="mb-3" controlId="username" label="Ваш ник">
        <Form.Control
          name="username"
          type="text"
          placeholder="Ваш ник"
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.username}
          isInvalid={f.errors.username && f.touched.username}
        />
        {f.errors.username && <Form.Control.Feedback type="invalid">{f.errors.username}</Form.Control.Feedback>}
      </Form.FloatingLabel>
      <Form.FloatingLabel className="mb-3" controlId="password" label="Пароль">
        <Form.Control
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.password}
          isInvalid={f.errors.password && f.touched.password}
        />
        {f.errors.password && <Form.Control.Feedback type="invalid">{f.errors.password}</Form.Control.Feedback>}
      </Form.FloatingLabel>
      <Button type="submit" variant="outline-primary">
        Войти
      </Button>
    </Form>
  );
};

export default SignInForm;
