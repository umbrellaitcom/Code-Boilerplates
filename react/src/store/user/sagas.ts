import { all, takeEvery, put } from 'redux-saga/effects';

import { logOutAction, checkAuthorizationAction, logInAction } from './actions';
import { checkAuthorizationSagas } from './sagas/checkAuthorization';
import { clearJWTToken, saveJWTToken } from '~/utils/jwtToken';
import { refreshTokenSagas } from './sagas/refreshToken';
import { CompletedRequestAction, transformToSuccess } from '~/utils/redux';
import { JWTToken } from '~/entities/JWTToken';

function* logInSuccessSaga(action: CompletedRequestAction<JWTToken>) {
  saveJWTToken(action.payload.data);
  yield put(checkAuthorizationAction(true));
}

function* logOutSaga() {
  clearJWTToken();
  yield put(checkAuthorizationAction(true));
}

function* otherSagas() {
  yield takeEvery(logOutAction, logOutSaga);
  yield takeEvery(transformToSuccess(logInAction.getType()), logInSuccessSaga);
}

export function* watchUserSagas() {
  yield all([checkAuthorizationSagas(), otherSagas(), refreshTokenSagas()]);
}
