import { NotificationsState } from './reducer';

interface StateShapeToSelectNotifications {
  notifications: NotificationsState;
}

export const notificationsStateSelector = (state: StateShapeToSelectNotifications): NotificationsState =>
  state.notifications;
