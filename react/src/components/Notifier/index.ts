import { connect } from 'react-redux';

import { RootState } from '~/store/rootReducer';
import * as actions from '~/store/notifications/actions';
import { notificationsStateSelector } from '~/store/notifications/selectors';
import { Notifier } from './Notifier';
import { NotifierProps } from './Notifier.types';

const mapStateToProps = (state: RootState): Pick<NotifierProps, 'notifications'> => ({
  notifications: notificationsStateSelector(state),
});

const mapDispatchToProps = {
  removeSnackbar: actions.removeSnackbarAction,
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(Notifier);

export { Connected as Notifier };
