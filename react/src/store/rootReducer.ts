import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { userReducer, UserState } from './user/reducer';
import { networkReducer, NetworkState } from './network/reducer';
import { notificationsReducer, NotificationsState } from './notifications/reducer';

export const history = createBrowserHistory();

export type RootState = {
  user: UserState;
  router: RouterState;
  network: NetworkState;
  notifications: NotificationsState;
};

export const rootReducer = combineReducers<RootState>({
  user: userReducer,
  router: connectRouter(history),
  network: networkReducer,
  notifications: notificationsReducer,
});
