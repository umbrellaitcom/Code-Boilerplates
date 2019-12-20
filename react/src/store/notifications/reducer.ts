import { createReducer } from 'redux-act';
import { get } from 'lodash';

import { enqueueSnackbarAction, closeSnackbarAction, removeSnackbarAction } from './actions';
import { Notification } from '~/components/notifier/Notifier.types';

export type NotificationsState = Notification[];

export const initialState: NotificationsState = [];

export const notificationsReducer = createReducer<NotificationsState>({}, initialState);

notificationsReducer.on(enqueueSnackbarAction, (state, notification): Notification[] => [...state, notification]);
notificationsReducer.on(closeSnackbarAction, (state, key): Notification[] => {
  const dismissAll = !key;

  return state.map((notification) =>
    dismissAll || get(notification, 'options.key', '') === key
      ? { ...notification, dismissed: true }
      : { ...notification },
  );
});
notificationsReducer.on(removeSnackbarAction, (state, key): Notification[] =>
  state.filter((notification) => get(notification, 'options.key', '') !== key),
);
