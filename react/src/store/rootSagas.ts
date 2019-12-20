import { all } from 'redux-saga/effects';

import { createRequestInstanceSaga, watchRequestsSaga } from './network/sagas';
import { watchUserSagas } from './user/sagas';

// Single entry point to start all Sagas at once
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* rootSaga() {
  yield createRequestInstanceSaga();

  yield all([
    // Put it before other sagas which handle requests, otherwise watchRequests might miss some requests
    // or your sagas might miss requests actions, like success
    watchRequestsSaga(),
    watchUserSagas(),
  ]);
}
