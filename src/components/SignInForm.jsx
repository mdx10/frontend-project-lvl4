import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import useAutn from '../hooks/useAuth.js';

const SignInForm = () => {
  const { t } = useTranslation();
  const { logIn } = useAutn();
  const location = useLocation();
  const navigate = useNavigate();

  const notify = () => toast.error(t('feedback.errors.networkProblem'));

  const from = location.state?.from?.pathname || '/';

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    initialStatus: {},
    validationSchema: yup.object({
      username: yup.string().required(t('feedback.errors.required')),
      password: yup.string().required(t('feedback.errors.required')),
    }),
    onSubmit: async (values, { setStatus }) => {
      try {
        setStatus({});
        const { data } = await axios.post(routes.loginPath(), values);
        logIn(data);
        navigate(from, { replace: true });
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setStatus({ authFailed: t('feedback.errors.invalidAuthData') });
          return;
        }
        notify();
        console.error(err);
      }
    },
  });
  return (
    <Form
      onSubmit={f.handleSubmit}
      autoComplete="off"
    >
      <Form.FloatingLabel className="mb-3" controlId="username" label={t('signin.form.username')}>
        <Form.Control
          name="username"
          type="text"
          placeholder={t('signin.form.username')}
          disabled={f.isSubmitting}
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.username}
          isInvalid={(f.status.authFailed || f.errors.username) && f.touched.username}
        />
        {f.errors.username && <Form.Control.Feedback type="invalid">{f.errors.username}</Form.Control.Feedback>}
      </Form.FloatingLabel>
      <Form.FloatingLabel className="mb-3" controlId="password" label={t('signin.form.password')}>
        <Form.Control
          name="password"
          type="password"
          placeholder={t('signin.form.password')}
          disabled={f.isSubmitting}
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.password}
          isInvalid={(f.status.authFailed || f.errors.password) && f.touched.password}
        />
        {f.errors.password && <Form.Control.Feedback type="invalid">{f.errors.password}</Form.Control.Feedback>}
        {f.status.authFailed && <Form.Control.Feedback type="invalid">{f.status.authFailed}</Form.Control.Feedback>}
      </Form.FloatingLabel>
      <Button className="w-100" disabled={f.isSubmitting} type="submit" variant="outline-primary">
        {t('signin.form.button')}
      </Button>
    </Form>
  );
};

export default SignInForm;
