import { combineReducers } from 'redux';

import { loggedUserJWTReducer, LoggedUserJWTState } from './reducers/loggedUser';

export type UserState = {
  loggedUserJWT: LoggedUserJWTState;
};

export const userReducer = combineReducers<UserState>({
  loggedUserJWT: loggedUserJWTReducer,
});
