import { connect } from 'react-redux';

import { PrivateRoute } from './PrivateRoute';
import { RootState } from '~/store/rootReducer';
import { loggedUserJWTSelector } from '~/store/user/selectors';
import { PrivateRouteProps } from './PrivateRoute.types';

const mapStateToProps = (state: RootState): Pick<PrivateRouteProps, 'isAuthenticated'> => ({
  isAuthenticated: !!loggedUserJWTSelector(state),
});

const Connected = connect(mapStateToProps)(PrivateRoute);

export { Connected as PrivateRoute };
