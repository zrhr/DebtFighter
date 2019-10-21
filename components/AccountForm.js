import { Formik } from 'formik';
import React from 'react';
import AccountFormView from './AccountFormView';
import { enterAccount }from '../store/accounts/actions'
import {connect} from 'react-redux'
import { calculateDebt } from './Debt';
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
  else if(isNaN(balance)){
    errors.balance = "Must be a number"
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
  else if(isNaN(minimumPayment)){
    errors.minimumPayment = "Must be a number"
  }

  return errors;
};

const AccountForm = (props) => {
//console.log(calculateDebt(props.accounts.accounts,props.accounts.debtPayment))

  const handleSubmit = async (
    { name, balance, apr, minimumPayment },
    { resetForm, setStatus, setSubmitting}
  ) => {
    let months, interestPaid, calcPayment,data;
    setStatus({});
    try {
     console.log("try")
      const accounts =[...props.accounts.accounts, {"name":name,"balance": parseFloat(balance), "apr":parseFloat(apr), "minimumPayment":parseFloat(minimumPayment), id: props.accounts.accounts.length+1 , months: 0, interestPaid: 0, calcPayment:0 }]
      console.log(accounts)
      data = calculateDebt(accounts, parseFloat(props.accounts.debtPayment))
      await wait();
      if(data==false)
      {
        throw "Error Check your input";
        console.log("broken")
      }
      else{
      console.log(data)
      props.dispatch(enterAccount({
        "accounts":accounts,
            
     
        avalanche:{"totalIntrst":data.avalanche.totalIntrst, "totalPayment": data.avalanche.totalPayment, "totalTerm":data.avalanche.totalTerm}
        ,snowball:{"totalIntrst":data.snowball.totalIntrst, "totalPayment": data.snowball.totalPayment, "totalTerm":data.snowball.totalTerm}
    }))
      resetForm();
      setStatus({ succeeded: true });
      setSubmitting(false);
      
      }
      
      // throw new Error(); // TESTING ERROR CASE
      
  
    
    //  if (accounts.length==0)
    //   {
    //     if(props.debtPayment>=parseFloat(minimumPayment))
    //     {
          
    //       props.dispatch(enterAccount({"name":name,"balance":balance, "apr":apr, "minimumPayment":minimumPayment, id:props.accounts.length , months: 0, interestPaid: 0, calcPayment:0 }))
    //     }
    //     else
    //     {
    //       props.dispatch(enterAccount({"name":name,"balance":balance, "apr":apr, "minimumPayment":minimumPayment, id:props.accounts.length , months: 0, interestPaid: 0, calcPayment:0 }))
    //     }
    //   }
    //   else {
    //     if (parseFloat(props.debtPayment)<=parseFloat(minimumPayment)){
    //       
    //       props.dispatch(enterAccount({"name":name,"balance":balance, "apr":apr, "minimumPayment":minimumPayment, id:props.accounts.length , months: 0, interestPaid: 0, calcPayment:0 }))
    //     }
    //      props.dispatch(enterAccount({"name":name,"balance":balance, "apr":apr, "minimumPayment":minimumPayment}))
    //     }
          
        }
     catch (err) {
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
  return( state)
  }

  export default connect (mapStateToProps)(AccountForm);