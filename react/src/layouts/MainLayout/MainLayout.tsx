import React, { FC } from 'react';
import { AppBar, Container, Toolbar, withStyles } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { LoginPage } from '~/pages/Login';
import { styles } from './MainLayout.styles';
import uitLogo from '~/assets/images/uit-logo.svg';
import { PrivateRoute } from '~/components/PrivateRoute';
import { SettingsPage } from '~/pages/Settings';
import { MainLayoutProps } from './MainLayout.types';
import { LogOutButton } from './LogOutButton';

const MainLayout: FC<MainLayoutProps> = ({ classes, loggedUserJWT }) => (
  <div className={classes.root}>
    <div className={classes.headerContainer}>
      <AppBar elevation={0}>
        <Toolbar>
          <Link to="/" title="Home">
            <img src={uitLogo} alt="UIT logo" />
          </Link>
          <div className={classes.toolbarShrink} />
          {loggedUserJWT && <LogOutButton />}
        </Toolbar>
      </AppBar>
    </div>
    <Container className={classes.bodyContainer}>
      <Switch>
        <PrivateRoute path="/settings" component={SettingsPage} />
        <Route path="/login" exact component={LoginPage} />
        <Redirect to="/settings" />
      </Switch>
    </Container>
    <div className={classes.footerContainer} />
  </div>
);

const Styled = withStyles(styles)(MainLayout);

export { Styled as MainLayout };
