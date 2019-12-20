import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push as routerPush } from 'connected-react-router';

import { LoginPageProps } from './LoginPage.types';
import { LoginPage } from './LoginPage';
import { loggedUserJWTSelector } from '~/store/user/selectors';
import { logInQuerySelector } from '~/store/network/selectors';
import { RootState } from '~/store/rootReducer';
import { enqueueSnackbarAction } from '~/store/notifications/actions';
import { logInAction, logOutAction } from '~/store/user/actions';

const mapStateToProps = (state: RootState): Pick<LoginPageProps, 'logInQuery' | 'loggedUserJWT'> => ({
  logInQuery: logInQuerySelector(state),
  loggedUserJWT: loggedUserJWTSelector(state),
});

const mapDispatchToProps = (
  dispatch: Dispatch,
): Pick<LoginPageProps, 'onError' | 'onLogIn' | 'onLogOut' | 'onSuccess'> => ({
  onLogIn: (): unknown => dispatch(logInAction({ login: 'login', password: 'password' })),
  onError: (message: string): unknown =>
    dispatch(
      enqueueSnackbarAction({
        message,
        options: {
          variant: 'error',
        },
      }),
    ),
  onLogOut: (): unknown => dispatch(logOutAction()),
  onSuccess: (): unknown => dispatch(routerPush('/')),
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export { Connected as LoginPage };
