import { Formik } from 'formik';
import React from 'react';
import AccountFormView from './AccountFormView';
import { enterAccount }from '../store/accounts/actions'
import {connect} from 'react-redux'
const wait = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});


const validate = ({ name, balance,apr,minimumPayment }) => {
  const errors = {};
  if (name === undefined) {
    errors.name = 'Required';
  } else if (name.trim() === '') {
    errors.name = 'Must not be blank';
  }
  if (balance === undefined) {
    errors.balance = 'Required';
  } else if (balance.trim() === '') {
    errors.balance = 'Must not be blank';
  }
  else if(isNaN(apr)){
    errors.apr = "Must be a number"
  }

  if (apr === undefined) {
    errors.apr = 'Required';
  } else if (apr.trim() === '') {
    errors.apr = 'Must not be blank';
    }
    else if(isNaN(apr)){
      errors.apr = "Must be a number"
    }

  
  if (minimumPayment === undefined) {
    errors.minimumPayment = 'Required';
  } else if (minimumPayment.trim() === '') {
    errors.minimumPayment = 'Must not be blank';
  }
  else if(isNaN(apr)){
    errors.apr = "Must be a number"
  }

  return errors;
};

const AccountForm = (props) => {
console.log(props)

  const handleSubmit = async (
    { name, balance, apr, minimumPayment },
    { resetForm, setStatus, setSubmitting}
  ) => {
    setStatus({});
    try {
      
      await wait();
      // throw new Error(); // TESTING ERROR CASE
      resetForm();
      setStatus({ succeeded: true });
      setSubmitting(true);
      console.log(`name: ${name}`);
      console.log(`balance: ${balance}`);
     if (props.accounts.accounts.length==0)
{
  if (parseFloat(props.debtPayment)<=parseFloat(minimumPayment))
  console.log("broken")
  props.dispatch(enterAccount({"name":name,"balance":balance, "apr":apr, "minimumPayment":minimumPayment, id:props.accounts.length , months: 0, interestPaid: 0, calcPayment:0 }))
}      props.dispatch(enterAccount({"name":name,"balance":balance, "apr":apr, "minimumPayment":minimumPayment}))
    } catch (err) {
      setStatus({ failed: true });
      setSubmitting(false);
    }
  };
return (
  <Formik
    onSubmit={handleSubmit}
    validate={validate}
    component={AccountFormView}
  />
);}

const mapStateToProps = (state) => {
  return( state.accounts)
  }

  export default connect (mapStateToProps)(AccountForm);