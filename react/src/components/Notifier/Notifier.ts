// https://codesandbox.io/s/github/iamhosseindhv/notistack/tree/master/examples/redux-example

import { Component } from 'react';
import { withSnackbar } from 'notistack';
import { get } from 'lodash';

import { NotifierProps } from './Notifier.types';

class Notifier extends Component<NotifierProps> {
  displayed: (string | number)[] = [];

  storeDisplayed = (key: string | number) => {
    this.displayed = [...this.displayed, key];
  };

  shouldComponentUpdate({ notifications: newNotifications }: Readonly<NotifierProps>): boolean {
    if (!newNotifications.length) {
      this.displayed = [];
      return false;
    }

    const { notifications: currentNotifications, closeSnackbar, removeSnackbar } = this.props;
    let notExists = false;

    for (let i = 0; i < newNotifications.length; i += 1) {
      const newNotification = newNotifications[i];
      const key: string | number = get(newNotification, 'options.key', '');

      if (!key) {
        console.error('Key must not be empty');
        continue;
      }

      if (newNotification.dismissed) {
        closeSnackbar(key);
        removeSnackbar(key);
      }

      if (notExists) {
        continue;
      }

      notExists =
        notExists ||
        !currentNotifications.filter(({ options }) => get(newNotification, 'options.key', '') === get(options, 'key'))
          .length;
    }

    return notExists;
  }

  componentDidUpdate() {
    const { notifications, enqueueSnackbar, removeSnackbar } = this.props;

    notifications.forEach(({ message, options }) => {
      const key: string | number = get(options, 'key', '');

      if (
        !key ||
        // Do nothing if snackbar is already displayed
        this.displayed.includes(key)
      ) {
        return;
      }

      // Display snackbar using notistack
      enqueueSnackbar(message, {
        ...options,
        onClose: (event, reason) => {
          if (options && options.onClose) {
            options.onClose(event, reason);
          }

          // Dispatch action to remove snackbar from redux store
          removeSnackbar(key);
        },
      });

      // Keep track of snackbars that we've displayed
      this.storeDisplayed(key);
    });
  }

  render() {
    // eslint-disable-next-line no-null/no-null
    return null;
  }
}

const WithSnackBar = withSnackbar(Notifier);

export { WithSnackBar as Notifier };
