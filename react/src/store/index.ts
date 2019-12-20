import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import { rootReducer, history } from './rootReducer';
import { rootSaga } from './rootSagas';

const initializeReduxDevTools = () => {
  if (
    process.env.NODE_ENV === 'production' ||
    typeof window === 'undefined' ||
    typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'undefined'
  ) {
    return compose;
  }

  return (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
};
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = initializeReduxDevTools();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)));

export const rootStore = createStore(rootReducer, enhancer);
export { history };

sagaMiddleware.run(rootSaga);
