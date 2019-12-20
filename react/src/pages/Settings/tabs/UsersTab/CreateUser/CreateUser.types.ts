import { WithStyles } from '@material-ui/core';

import { styles } from './CreateUser.styles';
import { FormikProps } from 'formik';
import { MutationState } from '~/utils/redux';
import { CreateUserRequestData } from '~/store/users/actions';

export type FormValues = {
  name: string;
  email: string;
};

export type CreateUserProps = {
  createUserQuery: MutationState;

  onCancel: () => void;
  onSubmit: (data: CreateUserRequestData) => void;
  onSuccess: () => void;
};

export type CreateUserFinalProps = CreateUserProps & WithStyles<typeof styles> & FormikProps<FormValues>;
