import { Formik } from 'formik';
import React from 'react';
import AccountFormView from './AccountFormView';

const wait = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

const handleSubmit = async (
  { firstName, balance, apr, minimumPayment },
  { resetForm, setStatus, setSubmitting }
) => {
  setStatus({});
  try {
    await wait();
    // throw new Error(); // TESTING ERROR CASE
    resetForm();
    setStatus({ succeeded: true });
    setSubmitting(false);
    console.log(`firstName: ${firstName}`);
    console.log(`balance: ${balance}`);
  } catch (err) {
    setStatus({ failed: true });
    setSubmitting(false);
  }
};

const validate = ({ firstName, balance }) => {
  const errors = {};
  if (firstName === undefined) {
    errors.firstName = 'Required';
  } else if (firstName.trim() === '') {
    errors.firstName = 'Must not be blank';
  }
  if (balance === undefined) {
    errors.balance = 'Required';
  } else if (balance.trim() === '') {
    errors.balance = 'Must not be blank';
  }
  if (apr === undefined) {
    errors.apr = 'Required';
  } else if (apr.trim() === '') {
    errors.apr = 'Must not be blank';
  }
  if (minimumPayment === undefined) {
    errors.minimumPayment = 'Required';
  } else if (minimumPayment.trim() === '') {
    errors.minimumPayment = 'Must not be blank';
  }
  return errors;
};

const AccountForm = () => (
  <Formik
    onSubmit={handleSubmit}
    validate={validate}
    component={AccountFormView}
  />
);


export default AccountForm;