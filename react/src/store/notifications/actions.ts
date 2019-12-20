import { createAction } from 'redux-act';
import shortid from 'shortid';

import { Notification } from '~/components/notifier/Notifier.types';

export const enqueueSnackbarAction = createAction<Notification>('ENQUEUE_SNACKBAR', (notification: Notification) => {
  if (!notification.options) {
    notification.options = {};
  }

  if (!notification.options.key) {
    notification.options.key = shortid.generate();
  }

  return notification;
});
export const closeSnackbarAction = createAction<string | undefined>('CLOSE_SNACKBAR');
export const removeSnackbarAction = createAction<string | number>('REMOVE_SNACKBAR');
