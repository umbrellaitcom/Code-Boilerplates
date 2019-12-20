import { OptionsObject, WithSnackbarProps } from 'notistack';

export type Notification = {
  message: string;
  dismissed: boolean;
  options?: OptionsObject;
};

export type NotifierProps = WithSnackbarProps & {
  notifications: Notification[];
  removeSnackbar: (key: string | number) => unknown;
};
