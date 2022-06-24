import { get } from 'lodash';

import { AppError, AppResponseError } from '../errors';
import { getAuthorizationBearerToken, getJWTToken, saveJWTToken, refreshJWTToken } from '../jwtToken';


const isTokenUrl = (url) => {
	const urlsToCheck = [process.env.VUE_APP_APIURI + '/login'];

	for (let i = 0, l = urlsToCheck.length; i < l; i++) {
		if (new RegExp(`^${urlsToCheck[i]}`).test(url)) {
			return true;
		}
	}

	return false;
};

const isErrorResponseShouldToUseRefreshToken = (error) => {
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

const isTokenErrorResponse = (error) => {
	if (
		AppResponseError.is(error) &&
		isTokenUrl(get(error, 'originalError.config.url')) &&
		get(error, 'originalError.isAxiosError')
	) {
		return true;
	}

	return false;
};

export const authorizationHeaderInterceptor = (instance) =>
	instance.interceptors.request.use(
		(config) => {
			if (!config.headers.Authorization) {
				const authorizationBearerTokenFromStorage = getAuthorizationBearerToken();

				if (authorizationBearerTokenFromStorage) {
					config.headers.Authorization = `Bearer ${authorizationBearerTokenFromStorage}`;
				}
			}

			return config;
		},
	);

export const appResponseErrorInterceptor = (instance) =>
	instance.interceptors.response.use(
		undefined,
		(error) => {
			if (error && !AppError.is(error)) {
				if (error.isAxiosError) {
					return Promise.reject(new AppResponseError(error));
				}

				return Promise.reject(new AppError(error));
			}

			return Promise.reject(error);
		},
	);

const refreshAndSaveJWTToken = (refresh_token) =>
	refreshJWTToken({
		refresh_token,
	}).then((newJWTToken) => {
		saveJWTToken(newJWTToken);

		return newJWTToken.access_token;
	});

let refreshCall;

export const refreshTokenInterceptor = (instance) => {
	return instance.interceptors.response.use(
		undefined,
		(error) => {
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
				(c) =>
					refreshCall
						? refreshCall.then(
						(accessToken) => {
							c.headers.Authorization = `Bearer ${accessToken}`;

							return c;
						},
						)
						: Promise.resolve(c),
			);

			return refreshCall
				.then(
					(accessToken) => {
						instance.interceptors.request.eject(requestQueueInterceptorId);
						refreshCall = undefined;
						config.headers.Authorization = `Bearer ${accessToken}`;

						return instance(config);
					},
				)
				.catch(
					(e) => {
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