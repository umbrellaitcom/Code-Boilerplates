import { createReducer } from 'redux-act';

import { DecodedJWTToken } from '~/entities/DecodedJWTToken';
import { checkAuthorizationSuccessAction } from '../actions';
import { clearReducerOnReset } from '~/utils/redux';

export type LoggedUserJWTState = DecodedJWTToken | null;

// eslint-disable-next-line no-null/no-null
const defaultState = null;

export const loggedUserJWTReducer = createReducer<LoggedUserJWTState>({}, defaultState);

loggedUserJWTReducer.on(checkAuthorizationSuccessAction, (_, { decodedJWTToken }) => decodedJWTToken);

clearReducerOnReset(loggedUserJWTReducer, defaultState);
