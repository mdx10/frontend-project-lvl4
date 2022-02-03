import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes.js';
import useAutn from '../hooks/useAuth.js';

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  confirmPassword: yup
    .string()
    .required('Обязательное поле')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

const SignUpForm = () => {
  const { logIn } = useAutn();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    initialStatus: {},
    validationSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        setStatus({});
        const { data } = await axios.post(routes.signupPath(), values);
        logIn(data);
        navigate(from, { replace: true });
        console.log(data);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setStatus({ signupFailed: 'Такой пользователь уже существует' });
        }
        console.error(err);
      }
    },
  });
  return (
    <Form
      onSubmit={f.handleSubmit}
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
          isInvalid={(f.status.signupFailed || f.errors.username) && f.touched.username}
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
          isInvalid={(f.status.signupFailed || f.errors.password) && f.touched.password}
        />
        {f.errors.password && <Form.Control.Feedback type="invalid">{f.errors.password}</Form.Control.Feedback>}
      </Form.FloatingLabel>
      <Form.FloatingLabel className="mb-3" controlId="confirmPassword" label="Пароль">
        <Form.Control
          name="confirmPassword"
          type="password"
          placeholder="Пароль"
          disabled={f.isSubmitting}
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.confirmPassword}
          isInvalid={
            (f.status.signupFailed || f.errors.confirmPassword) && f.touched.confirmPassword
          }
        />
        {f.errors.confirmPassword && <Form.Control.Feedback type="invalid">{f.errors.confirmPassword}</Form.Control.Feedback>}
        {f.status.signupFailed && <Form.Control.Feedback type="invalid">{f.status.signupFailed}</Form.Control.Feedback>}
      </Form.FloatingLabel>
      <Button className="w-100" disabled={f.isSubmitting} type="submit" variant="outline-primary">
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default SignUpForm;
