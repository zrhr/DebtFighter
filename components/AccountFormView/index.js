import { Field } from 'formik';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Button, Text, View} from 'react-native';
import FKTextInput from '../FKTextInput.js';
import styles from './styles';

const SubmissionFormView = ({
  handleSubmit,
  isSubmitting,
  isValid,
  status,
}) => (
  <View>
      <Text>Account Name</Text>
    <Field
      component={FKTextInput}
      disabled={isSubmitting}
      name="firstName" 
    />
    <Text>Account Balance</Text>
    <Field
      component={FKTextInput}
      disabled={isSubmitting}
      name="balance" 
    />
    <Text>Account Interest Rate</Text>
    <Field
      component={FKTextInput}
      disabled={isSubmitting}
      name="apr" 
    />
    <Text>Minimum Payment</Text>
    <Field
      component={FKTextInput}
      disabled={isSubmitting}
      name="minimumPayment" 
    />
  
    {status.succeeded && <Text style={styles.rootSucceeded}>SUCCEEDED</Text>}
    {status.failed && <Text style={styles.rootFailed}>FAILED</Text>}
    <Button
      disabled={!isValid || isSubmitting}
      title="Submit Submission"
      onPress={handleSubmit}
    />
  </View>
);

SubmissionFormView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  status: PropTypes.object,
};

SubmissionFormView.defaultProps = {
  status: {},
};

export default SubmissionFormView;