import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { UsersTab } from './UsersTab';
import { UsersTabProps } from './UsersTab.types';
import { RootState } from '~/store/rootReducer';
import { getUsersAction } from '~/store/users/actions';
import { getUsersQuerySelector } from '~/store/network/selectors';

const mapStateToProps = (state: RootState): Pick<UsersTabProps, 'getUsersQuery'> => ({
  getUsersQuery: getUsersQuerySelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<UsersTabProps, 'onMount' | 'onParams'> => ({
  onMount: (params): unknown => dispatch(getUsersAction(params)),
  onParams: (params): unknown => dispatch(getUsersAction(params)),
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(UsersTab);

export { Connected as UsersTab };
