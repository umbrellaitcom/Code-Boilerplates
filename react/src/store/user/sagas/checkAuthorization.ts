import { put, takeEvery } from 'redux-saga/effects';
import { push as routerPush } from 'connected-react-router';
import { Action } from 'redux-act';

import { reduxClearStoreAction } from '~/utils/redux';
import {
  addWatcherJWTTokenExpirationAction,
  checkAuthorizationAction,
  checkAuthorizationErrorAction,
  CheckAuthorizationSuccessActionPayload,
  checkAuthorizationSuccessAction,
  removeWatcherJWTTokenExpirationAction,
} from '../actions';
import { AppUnreachableError } from '~/utils/errors';
import { clearJWTToken, decodeJWTToken, getJWTToken } from '~/utils/jwtToken';
import { UserRoles } from '~/entities/DecodedJWTToken';
import { enqueueSnackbarAction } from '~/store/notifications/actions';

function* checkAuthorizationSaga({ payload: shouldRedirect }: Action<boolean>) {
  const decodedJWTToken = decodeJWTToken(getJWTToken(), false);

  try {
    if (!decodedJWTToken) {
      throw new AppUnreachableError('JWT token not found or incorrect');
    }

    if (!decodedJWTToken.data.roles.includes(UserRoles.Admin)) {
      yield put(
        enqueueSnackbarAction({
          message: 'You cannot login to the system as you are not an admin',
          options: {
            variant: 'warning',
          },
        }),
      );

      throw new AppUnreachableError('You are not an admin');
    }

    yield put(
      checkAuthorizationSuccessAction({
        shouldRedirect,
        decodedJWTToken,
      }),
    );
    yield put(addWatcherJWTTokenExpirationAction(decodedJWTToken));
  } catch (error) {
    yield put(checkAuthorizationErrorAction());
    yield put(removeWatcherJWTTokenExpirationAction());
  }
}

function* checkAuthorizationSuccessSaga({
  payload: { shouldRedirect },
}: Action<CheckAuthorizationSuccessActionPayload>) {
  if (shouldRedirect) {
    yield put(routerPush('/'));
  }
}

function* checkAuthorizationErrorSaga() {
  clearJWTToken();

  yield put(routerPush('/login'));
  yield put(reduxClearStoreAction());
}

export function* checkAuthorizationSagas() {
  yield takeEvery(checkAuthorizationAction, checkAuthorizationSaga);
  yield takeEvery(checkAuthorizationErrorAction, checkAuthorizationErrorSaga);
  yield takeEvery(checkAuthorizationSuccessAction, checkAuthorizationSuccessSaga);
}
