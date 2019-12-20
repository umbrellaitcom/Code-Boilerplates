import React from 'react';
import { CssBaseline, MuiThemeProvider, withStyles } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { rootStore, history } from '~/store';
import { rootTheme } from './Root.theme';
import { styles } from './Root.styles';
import { MainLayout } from '~/layouts/MainLayout';
import { checkAuthorizationAction } from '~/store/user/actions';
import { Notifier } from '../notifier';
import { onJWTTokenStorage } from '~/utils/jwtToken';
import { RootProps } from './Root.types';

rootStore.dispatch(checkAuthorizationAction(true));
onJWTTokenStorage(() => rootStore.dispatch(checkAuthorizationAction(true)));

const Root = ({ classes }: RootProps) => (
  <MuiThemeProvider theme={rootTheme}>
    <CssBaseline />
    <Provider store={rootStore}>
      <ConnectedRouter history={history}>
        <SnackbarProvider
          classes={{
            root: classes.snackbarRoot,
            variantError: classes.snackbarVariantError,
          }}
        >
          <Notifier />
          <Switch>
            <Route path="/" component={MainLayout} />
          </Switch>
        </SnackbarProvider>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
);

const Styled = withStyles(styles)(Root);

export { Styled as Root };
