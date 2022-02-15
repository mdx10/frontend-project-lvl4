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

const SignUpForm = () => {
  const { t } = useTranslation();
  const { logIn } = useAutn();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const notify = () => toast.error(t('feedback.errors.networkProblem'));

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, 'feedback.errors.minMax')
      .max(20, 'feedback.errors.minMax')
      .required('feedback.errors.required'),
    password: yup
      .string()
      .min(6, 'feedback.errors.min')
      .required('feedback.errors.required'),
    confirmPassword: yup
      .string()
      .required('feedback.errors.required')
      .oneOf([yup.ref('password')], 'feedback.errors.confirmPassword'),
  });

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
      } catch (err) {
        if (err.response && err.response.status === 409) {
          setStatus({ signupFailed: 'feedback.errors.userAlreadyExists' });
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
      <Form.FloatingLabel className="mb-3" controlId="username" label={t('signup.form.username')}>
        <Form.Control
          name="username"
          type="text"
          placeholder={t('signup.form.username')}
          disabled={f.isSubmitting}
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.username}
          isInvalid={(f.status.signupFailed || f.errors.username) && f.touched.username}
        />
        {f.errors.username && <Form.Control.Feedback type="invalid">{t(f.errors.username)}</Form.Control.Feedback>}
      </Form.FloatingLabel>
      <Form.FloatingLabel className="mb-3" controlId="password" label={t('signup.form.password')}>
        <Form.Control
          name="password"
          type="password"
          placeholder={t('signup.form.password')}
          disabled={f.isSubmitting}
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.password}
          isInvalid={(f.status.signupFailed || f.errors.password) && f.touched.password}
        />
        {f.errors.password && <Form.Control.Feedback type="invalid">{t(f.errors.password)}</Form.Control.Feedback>}
      </Form.FloatingLabel>
      <Form.FloatingLabel className="mb-3" controlId="confirmPassword" label={t('signup.form.confirmPassword')}>
        <Form.Control
          name="confirmPassword"
          type="password"
          placeholder={t('signup.form.confirmPassword')}
          disabled={f.isSubmitting}
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.confirmPassword}
          isInvalid={
            (f.status.signupFailed || f.errors.confirmPassword) && f.touched.confirmPassword
          }
        />
        {f.errors.confirmPassword && <Form.Control.Feedback type="invalid">{t(f.errors.confirmPassword)}</Form.Control.Feedback>}
        {f.status.signupFailed && <Form.Control.Feedback type="invalid">{t(f.status.signupFailed)}</Form.Control.Feedback>}
      </Form.FloatingLabel>
      <Button className="w-100" disabled={f.isSubmitting} type="submit" variant="outline-primary">
        {t('signup.form.button')}
      </Button>
    </Form>
  );
};

export default SignUpForm;
