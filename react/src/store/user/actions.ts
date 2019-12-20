import { createAction } from 'redux-act';
import urljoin from 'url-join';

import { DecodedJWTToken } from '~/entities/DecodedJWTToken';
import { RequestActionPayload, CastableRequestActionMeta } from '~/utils/redux';
import { castJWTToken, JWTToken } from '~/entities/JWTToken';

export const logOutAction = createAction('LOG_OUT');

export type CheckAuthorizationSuccessActionPayload = {
  shouldRedirect: boolean;
  decodedJWTToken: DecodedJWTToken;
};

export const checkAuthorizationAction = createAction<boolean>('CHECK_AUTHORIZATION');
export const checkAuthorizationSuccessAction = createAction<CheckAuthorizationSuccessActionPayload>(
  'CHECK_AUTHORIZATION_SUCCESS',
);
export const checkAuthorizationErrorAction = createAction('CHECK_AUTHORIZATION_ERROR');

export const addWatcherJWTTokenExpirationAction = createAction<DecodedJWTToken>('ADD_WATCHER_JWT_TOKEN_EXPIRATION');
export const removeWatcherJWTTokenExpirationAction = createAction('REMOVE_WATCHER_JWT_TOKEN_EXPIRATION');
export const refreshTokenAction = createAction('REFRESH_TOKEN');

export type LogInRequestData = {
  login: string;
  password: string;
};

export const logInAction = createAction<LogInRequestData, RequestActionPayload>(
  'LOG_IN',
  (credentials) => ({
    request: { url: urljoin(process.env.REACT_APP_API_URL, '/login'), method: 'post', body: credentials },
  }),
  (): CastableRequestActionMeta<JWTToken> => ({
    castResponseFunction: castJWTToken,
    driver: 'mock',
    asMutation: false,
    // Don't want to store the data in Redux store
    getData: () => undefined,
  }),
);
