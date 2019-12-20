import { AnyAction } from 'redux';
import { createAction, Reducer } from 'redux-act';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { get, isArray, hasIn } from 'lodash';
import {
  // eslint-disable-next-line import/named
  RequestActionMeta,
  success,
  error,
  abort,
  getMutation,
  getQuery,
  networkReducer as createNetworkReducer,
  // eslint-disable-next-line import/named
  MutationState,
  // eslint-disable-next-line import/named
  QueryState,
  createRequestInstance,
  error as errorTypeModifier,
  watchRequests,
} from 'redux-saga-requests';

import { CastArrayFunc, CastFunction, CastPagedFunc } from '~/utils/validation';
import { PagedResponse } from '~/entities/PagedResponse';
import { AppResponseError } from '~/utils/errors';

export {
  success as transformToSuccess,
  error as transformToError,
  abort as transformToAbort,
  getMutation,
  getQuery,
  createNetworkReducer,
  MutationState,
  QueryState,
  createRequestInstance,
  errorTypeModifier,
  watchRequests,
  RequestActionMeta,
};

export type CastableRequestActionMeta<T> = RequestActionMeta & {
  castResponseFunction: CastFunction<T> | CastPagedFunc<T> | CastArrayFunc<T>;
};

export type RequestActionPayload<T = {}> = {
  request: AxiosRequestConfig;
} & T;

export type CompletedRequestAction<T> = {
  type: string;
  payload: {
    data: T;
    response: AxiosResponse<T>;
  };
  meta?: RequestActionMeta;
};

export const reduxClearStoreAction = createAction('REDUX_CLEAR_STORE');

export const clearReducerOnReset = <S>(reducer: Reducer<S, AnyAction>, defaultState: S): void => {
  reducer.on(reduxClearStoreAction, (): S => defaultState);
};

export const resetAndAbortOn = (action: AnyAction): boolean => [reduxClearStoreAction.getType()].includes(action.type);

export const isMutation = (query: QueryState<any> | MutationState): query is MutationState => !hasIn(query, 'data');

export const isQuery = (query: QueryState<any> | MutationState): query is QueryState<any> => hasIn(query, 'data');

export const isLoading = (query: QueryState<any> | MutationState): boolean => query.loading;

export const isLoaded = (query: QueryState<any> | MutationState): boolean => {
  if (isQuery(query)) {
    return !query.error && query.data && !query.loading;
  }

  if (isMutation(query)) {
    return !query.error && !query.loading;
  }

  return false;
};

export const isError = (query: QueryState<any> | MutationState): boolean => query.error && !isLoading(query);

export const isLoadedTriggered = (prevQuery: QueryState<any> | MutationState, query: QueryState<any> | MutationState) =>
  !isLoaded(prevQuery) && isLoaded(query);

export const isErrorTriggered = (
  prevQuery: QueryState<any> | MutationState,
  query: QueryState<any> | MutationState,
): boolean => !isError(prevQuery) && isError(query);

export const isPaged = (query: QueryState<any>): query is QueryState<PagedResponse<any>> =>
  get(query.data, 'pagination') && isArray(get(query.data, 'items'));

export const hasRows = (query: QueryState<any>): boolean => isPaged(query) && query.data.items.length > 0;

export const getError = (query: QueryState<any> | MutationState): undefined | AppResponseError =>
  isError(query) ? query.error : undefined;

export const getErrorMessage = (query: QueryState<any> | MutationState): string => {
  const error = getError(query);

  return error ? error.message : '';
};

export const getCount = (query: QueryState<any>): number => (isPaged(query) ? query.data.pagination.rowCount : 0);
