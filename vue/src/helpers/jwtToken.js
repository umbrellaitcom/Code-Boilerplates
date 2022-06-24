import jwtDecode from 'jwt-decode';

import { post } from './request';
import { JWT_TOKEN_LS_KEY } from '../constants/store';
import { getItem, setItem, removeItem } from './store';

export const getJWTToken = () => {
	const jwtToken = getItem(JWT_TOKEN_LS_KEY);

	if (jwtToken) {
			const tokenParsed = JSON.parse(jwtToken);

			if (tokenParsed) {
				return tokenParsed;
			}
	}

	return undefined;
};

export const getAuthorizationBearerToken = () => {
	const jwtToken = getJWTToken();
	return jwtToken && jwtToken.access_token ? jwtToken.access_token : '';
};

export const getRefreshToken = () => {
	const jwtToken = getJWTToken();
	return jwtToken && jwtToken.refresh_token ? jwtToken.refresh_token : '';
};

export const saveJWTToken = ({ access_token, refresh_token }) => {
	setItem(JWT_TOKEN_LS_KEY, JSON.stringify({ access_token, refresh_token }));
};

export const clearJWTToken = () => {
	removeItem(JWT_TOKEN_LS_KEY);
};

export const decodeJWTToken = (jwtToken, throwError = true) => {
	if (jwtToken) {
		try {
			const jwtTokenDecoded = jwtDecode(jwtToken.access_token);

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

export const onJWTTokenStorage = (callback) => {
	try {
		window.addEventListener(
			'storage',
			(event) => {
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

export const refreshJWTToken = (data) =>
	post(process.env.VUE_APP_APIURI + '/auth/refresh-token', {
		data,
	}).then((response) => response.data.refresh_token);