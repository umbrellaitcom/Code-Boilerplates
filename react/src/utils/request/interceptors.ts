import { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { get } from 'lodash';
import urlJoin from 'url-join';

import { getAuthorizationBearerToken, getJWTToken, saveJWTToken, refreshJWTToken } from '../jwtToken';
import { AppError, AppResponseError } from '../errors';
import { rootStore } from '~/store';
import { checkAuthorizationAction } from '~/store/user/actions';

const isTokenUrl = (url: string) => {
  const urlsToCheck = [urlJoin(process.env.REACT_APP_API_URL, '/login')];

  for (let i = 0, l = urlsToCheck.length; i < l; i++) {
    if (new RegExp(`^${urlsToCheck[i]}`).test(url)) {
      return true;
    }
  }

  return false;
};

const isErrorResponseShouldToUseRefreshToken = (error: unknown): boolean => {
  if (
    AppResponseError.is(error) &&
    !isTokenUrl(get(error, 'originalError.config.url')) &&
    get(error, 'originalError.isAxiosError') &&
    get(error, 'originalError.response.status') === 401
  ) {
    return true;
  }

  return false;
};

const isTokenErrorResponse = (error: unknown): boolean => {
  if (
    AppResponseError.is(error) &&
    isTokenUrl(get(error, 'originalError.config.url')) &&
    get(error, 'originalError.isAxiosError')
  ) {
    return true;
  }

  return false;
};

export const authorizationHeaderInterceptor = (instance: AxiosInstance) =>
  instance.interceptors.request.use(
    (config): AxiosRequestConfig => {
      if (!config.headers.Authorization) {
        const authorizationBearerTokenFromStorage = getAuthorizationBearerToken();

        if (authorizationBearerTokenFromStorage) {
          config.headers.Authorization = `Bearer ${authorizationBearerTokenFromStorage}`;
        }
      }

      return config;
    },
  );

export const appResponseErrorInterceptor = (instance: AxiosInstance) =>
  instance.interceptors.response.use(
    undefined,
    (error: AxiosError): Promise<never> => {
      if (error && !AppError.is(error)) {
        if (error.isAxiosError) {
          return Promise.reject(new AppResponseError(error));
        }

        return Promise.reject(new AppError(error));
      }

      return Promise.reject(error);
    },
  );

// eslint-disable-next-line @typescript-eslint/camelcase
const refreshAndSaveJWTToken = (refresh_token: string) =>
  refreshJWTToken({
    // eslint-disable-next-line @typescript-eslint/camelcase
    refresh_token,
  }).then((newJWTToken) => {
    saveJWTToken(newJWTToken);

    // To update refresh token listeners
    rootStore.dispatch(checkAuthorizationAction(false));

    return newJWTToken.access_token;
  });

let refreshCall: Promise<string> | undefined;

export const refreshTokenInterceptor = (instance: AxiosInstance): number => {
  return instance.interceptors.response.use(
    undefined,
    (error: unknown): Promise<unknown> => {
      if (!isErrorResponseShouldToUseRefreshToken(error) || !AppResponseError.is(error)) {
        return Promise.reject(error);
      }

      const config = error.originalError.config;
      const jwtToken = getJWTToken();

      if (!jwtToken) {
        return Promise.reject(error);
      }

      refreshCall = refreshCall || refreshAndSaveJWTToken(jwtToken.refresh_token);

      // Create interceptor that will bind all the others requests
      // until refreshCall is resolved
      const requestQueueInterceptorId = instance.interceptors.request.use(
        (c: AxiosRequestConfig): Promise<AxiosRequestConfig> =>
          refreshCall
            ? refreshCall.then(
                (accessToken): AxiosRequestConfig => {
                  c.headers.Authorization = `Bearer ${accessToken}`;

                  return c;
                },
              )
            : Promise.resolve(c),
      );

      return refreshCall
        .then(
          (accessToken): AxiosPromise<unknown> => {
            instance.interceptors.request.eject(requestQueueInterceptorId);
            refreshCall = undefined;
            config.headers.Authorization = `Bearer ${accessToken}`;

            return instance(config);
          },
        )
        .catch(
          (e): Promise<unknown> => {
            instance.interceptors.request.eject(requestQueueInterceptorId);
            refreshCall = undefined;

            if (isTokenErrorResponse(e)) {
              error.parent = e;
              return Promise.reject(error);
            }

            return Promise.reject(e);
          },
        );
    },
  );
};
