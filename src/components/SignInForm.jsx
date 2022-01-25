/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
} from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  userName: yup.string().required('Required'),
  password: yup.string().required('Required'),
});

const SignInForm = () => (
  <Formik
    initialValues={{ userName: '', password: '' }}
    validationSchema={validationSchema}
    onSubmit={(values, { resetForm }) => {
      console.log(values);
      resetForm();
    }}
  >
    {({ errors, touched }) => (
      <Form className="m-auto" style={{ maxWidth: '350px' }} autoComplete="off">
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Name
          </label>
          <Field
            name="userName"
            id="userName"
            type="text"
            className={
              errors.userName && touched.userName
                ? 'form-control is-invalid'
                : 'form-control'
            }
          />
          <ErrorMessage
            name="userName"
            component="div"
            className="invalid-feedback"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <Field
            name="password"
            id="password"
            type="password"
            className={
              errors.password && touched.password
                ? 'form-control is-invalid'
                : 'form-control'
            }
          />
          <ErrorMessage
            className="invalid-feedback"
            component="div"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    )}
  </Formik>
);

export default SignInForm;
