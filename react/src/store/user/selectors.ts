import { createSelector } from 'reselect';

import { UserState } from './reducer';

interface StateShapeToSelectUser {
  user: UserState;
}

const userStateSelector = (state: StateShapeToSelectUser): UserState => state.user;

export const loggedUserJWTSelector = createSelector(userStateSelector, (state) => state.loggedUserJWT);
