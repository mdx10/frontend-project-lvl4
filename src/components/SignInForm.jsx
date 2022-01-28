import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes.js';

const validationSchema = yup.object({
  username: yup.string().required('Введите ник'),
  password: yup.string().required('Введите пароль'),
});

const handleSubmit = async (values, { setStatus }) => {
  try {
    setStatus({});
    const { data } = await axios.post(routes.loginPath(), values);
    console.log(data);
  } catch (err) {
    if (err.isAxiosError && err.response.status === 401) {
      setStatus({ authFailed: 'Неверные имя пользователя или пароль' });
    }
    console.error(err);
  }
};

const SignInForm = () => {
  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    initialStatus: {},
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Form
      onSubmit={f.handleSubmit}
      className="m-auto"
      style={{ maxWidth: '350px' }}
      autoComplete="off"
    >
      <Form.FloatingLabel className="mb-3" controlId="username" label="Ваш ник">
        <Form.Control
          name="username"
          type="text"
          placeholder="Ваш ник"
          disabled={f.isSubmitting}
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.username}
          isInvalid={(f.status.authFailed || f.errors.username) && f.touched.username}
        />
        {f.errors.username && <Form.Control.Feedback type="invalid">{f.errors.username}</Form.Control.Feedback>}
      </Form.FloatingLabel>
      <Form.FloatingLabel className="mb-3" controlId="password" label="Пароль">
        <Form.Control
          name="password"
          type="password"
          placeholder="Пароль"
          disabled={f.isSubmitting}
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.password}
          isInvalid={(f.status.authFailed || f.errors.password) && f.touched.password}
        />
        {f.errors.password && <Form.Control.Feedback type="invalid">{f.errors.password}</Form.Control.Feedback>}
        {f.status.authFailed && <Form.Control.Feedback type="invalid">{f.status.authFailed}</Form.Control.Feedback>}
      </Form.FloatingLabel>
      <Button disabled={f.isSubmitting} type="submit" variant="outline-primary">
        Войти
      </Button>
    </Form>
  );
};

export default SignInForm;
