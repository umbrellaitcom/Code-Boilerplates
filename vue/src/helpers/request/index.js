import axios from 'axios';
import qs from 'qs';
import { forEach } from 'lodash';

import {authorizationHeaderInterceptor, appResponseErrorInterceptor, refreshTokenInterceptor} from './interceptors';

export const axiosInstance = axios.create();

const apiUrl = process.env.VUE_APP_APIURI;

const ContentType = {
	formUrlencoded: 'application/x-www-form-urlencoded',
	formData: 'multipart/form-data',
	JSON: 'application/json;charset=UTF-8',
}

authorizationHeaderInterceptor(axiosInstance);
appResponseErrorInterceptor(axiosInstance);
refreshTokenInterceptor(axiosInstance);

function convertDataToRequestFormat(data, contentType) {
	switch (contentType) {
		case ContentType.formUrlencoded:
			return qs.stringify(data);
		case ContentType.formData: {
			const formData = new FormData();

			forEach(data, (value, key) => formData.append(key, value));

			return formData;
		}
		default:
			return data;
	}
}

export const request = (
	method,
	url,
	{data, params} = {},
	{headers, opts, isBlob, contentType, authorizationBearerToken} = {}
) => {
	const config = {
		url: apiUrl + url,
		method,
		params,
		data: data ? convertDataToRequestFormat(data, contentType) : undefined,
		...(isBlob
			? {
				responseType: 'blob',
				timeout: 30000,
			}
			: {}),
		...(opts || {}),
		headers: {
			'Content-Type': contentType || 'application/json;charset=UTF-8',
			...(authorizationBearerToken
				? {
					'Authorization': `Bearer ${authorizationBearerToken}`,
				}
				: {}),
			...(headers || {}),
		},
	};

	return axiosInstance(config);
};

export const get = (url, dataAndParams, options) => request('get', url, dataAndParams, options);

export const post = (url, dataAndParams, options) => request('post', url, dataAndParams, options);

export const put = (url, dataAndParams, options) => request('put', url, dataAndParams, options);

export const del = (url, dataAndParams, options) => request('delete', url, dataAndParams, options);
