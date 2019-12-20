import { connect } from 'react-redux';

import { RootState } from '~/store/rootReducer';
import { loggedUserJWTSelector } from '~/store/user/selectors';
import { MainLayout } from './MainLayout';
import { MainLayoutProps } from './MainLayout.types';

const mapStateToProps = (state: RootState): Pick<MainLayoutProps, 'loggedUserJWT'> => ({
  loggedUserJWT: loggedUserJWTSelector(state),
});
const Connected = connect(mapStateToProps)(MainLayout);

export { Connected as MainLayout };
