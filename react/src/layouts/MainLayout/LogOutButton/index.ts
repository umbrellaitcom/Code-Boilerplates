import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { checkAuthorizationAction } from '~/store/user/actions';
import { clearJWTToken } from '~/utils/jwtToken';
import { LogOutButtonProps } from './LogOutButton.types';
import { LogOutButton } from './LogOutButton';

export * from './LogOutButton';

const mapDispatchToProps = (dispatch: Dispatch): Pick<LogOutButtonProps, 'onLogOut'> => ({
  onLogOut: (): void => {
    clearJWTToken();
    dispatch(checkAuthorizationAction(true));
  },
});

const Connected = connect(undefined, mapDispatchToProps)(LogOutButton);

export { Connected as LogOutButton };
