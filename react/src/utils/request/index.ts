import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { forEach, isString, transform } from 'lodash';

import { appResponseErrorInterceptor, authorizationHeaderInterceptor, refreshTokenInterceptor } from './interceptors';

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

interface DataObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface RequestDataAndParams {
  data?: DataObject;
  params?: DataObject;
}

export enum ContentType {
  FormUrlencoded = 'application/x-www-form-urlencoded',
  FormData = 'multipart/form-data',
  JSON = 'application/json;charset=UTF-8',
}

interface RequestOptions {
  isBlob?: boolean;
  headers?: DataObject;
  opts?: Partial<AxiosRequestConfig>;
  contentType?: ContentType;
  authorizationBearerToken?: string;
}

export const axiosInstance = axios.create();

const authorizationHeaderInterceptorId = authorizationHeaderInterceptor(axiosInstance);
const appResponseErrorInterceptorId = appResponseErrorInterceptor(axiosInstance);
const refreshTokenInterceptorId = refreshTokenInterceptor(axiosInstance);

if (module.hot) {
  module.hot.dispose((): void => {
    axiosInstance.interceptors.request.eject(authorizationHeaderInterceptorId);
    axiosInstance.interceptors.request.eject(appResponseErrorInterceptorId);
    axiosInstance.interceptors.request.eject(refreshTokenInterceptorId);
  });
}

function convertDataToRequestFormat(data: DataObject, contentType?: ContentType): DataObject | string | FormData {
  switch (contentType) {
    case ContentType.FormUrlencoded:
      return qs.stringify(data);
    case ContentType.FormData: {
      const formData = new FormData();

      forEach(data, (value, key): void => formData.append(key, value));

      return formData;
    }
    default:
      return data;
  }
}

export const request = (
  method: RequestMethod,
  url: string,
  { data, params }: RequestDataAndParams = {},
  { headers, opts, isBlob, contentType, authorizationBearerToken }: RequestOptions = {},
): Promise<unknown> => {
  const config: AxiosRequestConfig = {
    url: url,
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
      'Content-Type': contentType || ContentType.JSON,
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

export const get = (url: string, dataAndParams?: RequestDataAndParams, options?: RequestOptions): Promise<unknown> =>
  request('get', url, dataAndParams, options);

export const post = (url: string, dataAndParams?: RequestDataAndParams, options?: RequestOptions): Promise<unknown> =>
  request('post', url, dataAndParams, options);

export const put = (url: string, dataAndParams?: RequestDataAndParams, options?: RequestOptions): Promise<unknown> =>
  request('put', url, dataAndParams, options);

export const del = (url: string, dataAndParams?: RequestDataAndParams, options?: RequestOptions): Promise<unknown> =>
  request('delete', url, dataAndParams, options);

export const clearData = <T extends { [key: string]: unknown }>(data: T): { [key: string]: unknown } =>
  transform(
    data,
    (result, value, key): void => {
      result[key] = isString(value) && value === '' ? undefined : value;
    },
    {} as { [key: string]: unknown },
  );
