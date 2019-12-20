import { takeLatest, delay, put, fork, cancel, take, call } from 'redux-saga/effects';
import { Action } from 'redux-act';

import {
  addWatcherJWTTokenExpirationAction,
  checkAuthorizationAction,
  refreshTokenAction,
  removeWatcherJWTTokenExpirationAction,
} from '../actions';
import { DecodedJWTToken } from '~/entities/DecodedJWTToken';
import { getRefreshToken, saveJWTToken, refreshJWTToken} from '~/utils/jwtToken';
import { AppUnreachableError } from '~/utils/errors';

function* refreshToken() {
  try {
    const jwtToken = yield call(refreshJWTToken, {
      // eslint-disable-next-line @typescript-eslint/camelcase
      refresh_token: getRefreshToken(),
    });

    saveJWTToken(jwtToken);

    yield put(checkAuthorizationAction(true));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Couldn't refresh JWT token");
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

function* addWatcherJWTTokenExpirationSaga(action: Action<DecodedJWTToken>) {
  const timeStampNow = new Date().getTime();
  const jwtTokenExpirationTimestamp = action.payload.exp * 1000;
  const jwtTokenCreationTimestamp = action.payload.iat * 1000;
  const leftToExpire = jwtTokenExpirationTimestamp - timeStampNow;
  const lifeTime = jwtTokenExpirationTimestamp - jwtTokenCreationTimestamp;
  const timeToCompleteRequest = 15000;
  const minLifeTime = timeToCompleteRequest + 60000;

  try {
    if (lifeTime < minLifeTime) {
      throw new AppUnreachableError('JWT token lifetime is too small');
    }

    if (leftToExpire < timeToCompleteRequest) {
      // eslint-disable-next-line no-console
      console.info('There is too small life time left to refresh JWT token');
    } else {
      yield delay(leftToExpire - timeToCompleteRequest);
      yield put(refreshTokenAction());
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

function* watcherJWTTokenExpirationSaga(action: Action<DecodedJWTToken>) {
  const watcherTask = yield fork(addWatcherJWTTokenExpirationSaga, action);

  yield take(removeWatcherJWTTokenExpirationAction);
  yield cancel(watcherTask);
}

export function* refreshTokenSagas() {
  yield takeLatest(addWatcherJWTTokenExpirationAction, watcherJWTTokenExpirationSaga);
  yield takeLatest(refreshTokenAction, refreshToken);
}
