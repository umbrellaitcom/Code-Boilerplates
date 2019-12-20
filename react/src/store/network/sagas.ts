import { put } from 'redux-saga/effects';
import { createDriver as createAxiosDriver } from 'redux-saga-requests-axios';
import { createDriver as createMockDriver } from 'redux-saga-requests-mock';
import { hasIn } from 'lodash';

import { axiosInstance } from '~/utils/request';
import {
  CastableRequestActionMeta,
  resetAndAbortOn,
  RequestActionMeta,
  createRequestInstance,
  errorTypeModifier,
  watchRequests,
} from '~/utils/redux';
import { castResponse } from '~/utils/validation';
import { mocks } from './mocks';

const hasCastResponse = (meta?: RequestActionMeta): meta is CastableRequestActionMeta<unknown> =>
  hasIn(meta, 'castResponseFunction');

function* onSuccessSaga(response: any, action: RequestActionMeta) {
  if (hasCastResponse(action.meta)) {
    try {
      const data = castResponse(response, action.meta.castResponseFunction);

      response.data = data;

      return response;
    } catch (error) {
      yield put({
        type: errorTypeModifier(action.type),
        payload: error,
      });

      throw error;
    }
  }

  return response;
}

export const createRequestInstanceSaga = () =>
  createRequestInstance({
    driver: {
      default: createAxiosDriver(axiosInstance),
      mock: createMockDriver(mocks, { timeout: 1000 }),
    },
    onSuccess: onSuccessSaga,
  });

export const watchRequestsSaga = () =>
  watchRequests({
    abortOn: resetAndAbortOn,
  });
