/* eslint-disable @typescript-eslint/camelcase */

import jwtDecode from 'jwt-decode';
import urlJoin from 'url-join';

import { castJWTToken, JWTToken } from '~/entities/JWTToken';
import { castResponse } from '~/utils/validation';
import { post } from '~/utils/request';
import { JWT_TOKEN_LS_KEY } from '~/constants';
import { getItem, setItem, removeItem } from './storage';
import { castDecodedJWTToken, DecodedJWTToken } from '~/entities/DecodedJWTToken';

export const getJWTToken = (): JWTToken | undefined => {
  const jwtToken = getItem(JWT_TOKEN_LS_KEY);

  if (jwtToken) {
    try {
      const tokenParsed = castJWTToken(JSON.parse(jwtToken));

      if (tokenParsed) {
        return tokenParsed;
      }
    } catch {
      // eslint-disable-line no-empty
    }
  }

  return undefined;
};

export const getAuthorizationBearerToken = (): string => {
  const jwtToken = getJWTToken();
  return jwtToken && jwtToken.access_token ? jwtToken.access_token : '';
};

export const getRefreshToken = (): string => {
  const jwtToken = getJWTToken();
  return jwtToken && jwtToken.refresh_token ? jwtToken.refresh_token : '';
};

export const saveJWTToken = ({ access_token, refresh_token }: JWTToken): void => {
  setItem(JWT_TOKEN_LS_KEY, JSON.stringify({ access_token, refresh_token }));
};

export const clearJWTToken = (): void => {
  removeItem(JWT_TOKEN_LS_KEY);
};

export const decodeJWTToken = (jwtToken: JWTToken | undefined, throwError = true): DecodedJWTToken | undefined => {
  if (jwtToken) {
    try {
      const jwtTokenDecoded = castDecodedJWTToken(jwtDecode(jwtToken.access_token));

      if (jwtTokenDecoded) {
        return jwtTokenDecoded;
      }
    } catch (error) {
      if (throwError && error) {
        throw error;
      }
    }
  }

  return undefined;
};

export const onJWTTokenStorage = (callback: () => void): void => {
  try {
    window.addEventListener(
      'storage',
      (event: StorageEvent): void => {
        if (event) {
          const { key } = event;

          if (key === JWT_TOKEN_LS_KEY) {
            callback();
          }
        }
      },
      false,
    );
  } catch {
    // eslint-disable-line no-empty
  }
};

export type RefreshTokenRequestData = {
  refresh_token: string;
};

export const refreshJWTToken = (data: RefreshTokenRequestData): Promise<JWTToken> =>
  post(urlJoin(process.env.REACT_APP_API_URL, '/auth/refresh-token'), {
    data,
  }).then((response) => castResponse(response, castJWTToken));
