import React from 'react';
import { Form, Field, withFormik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, withStyles } from '@material-ui/core';

import { styles } from './CreateUser.styles';
import { CreateUserProps, CreateUserFinalProps, FormValues } from './CreateUser.types';
import { Yup } from '~/utils/validation';
import { errorToSnackbar } from '~/utils/errors';
import { isErrorTriggered, isLoadedTriggered } from '~/utils/redux';

const scheme = Yup.object<FormValues>({
  name: Yup.string()
    .min(2)
    .max(256)
    .required()
    .label('Name'),
  email: Yup.string()
    .email()
    .required()
    .label('Email'),
}).label('CreateUserValues');

class CreateUser extends React.Component<CreateUserFinalProps> {
  componentDidUpdate(prevProps: Readonly<CreateUserFinalProps>) {
    const { setSubmitting, createUserQuery, onSuccess } = this.props;

    if (isLoadedTriggered(prevProps.createUserQuery, createUserQuery)) {
      setSubmitting(false);
      onSuccess();
    }

    if (isErrorTriggered(prevProps.createUserQuery, createUserQuery)) {
      setSubmitting(false);
      errorToSnackbar(createUserQuery.error);
    }
  }

  render() {
    const { onCancel, isSubmitting, classes } = this.props;

    return (
      <Form noValidate>
        <Field
          className={classes.textField}
          component={TextField}
          fullWidth
          type="text"
          name="name"
          label="Name"
          variant="outlined"
          required
        />
        <Field
          className={classes.textField}
          component={TextField}
          fullWidth
          type="text"
          name="email"
          label="Email"
          variant="outlined"
          required
        />
        <Button
          className={classes.submitButton}
          disabled={isSubmitting}
          size="large"
          color="primary"
          variant="outlined"
          type="submit"
        >
          Save
        </Button>
        <Button
          disabled={isSubmitting}
          onClick={onCancel}
          size="large"
          color="secondary"
          variant="outlined"
          type="button"
        >
          Cancel
        </Button>
      </Form>
    );
  }
}

const Styled = withStyles(styles)(CreateUser);
const WithFormik = withFormik<CreateUserProps, FormValues>({
  mapPropsToValues: () => ({ name: '', email: '' }),
  handleSubmit: (values: FormValues, { props: { onSubmit } }) => {
    onSubmit(values);
  },
  validationSchema: scheme,
})(Styled);

export { WithFormik as CreateUser };
