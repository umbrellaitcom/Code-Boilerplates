import React, { Fragment, Component } from 'react';
import { Button, Typography, withStyles } from '@material-ui/core';

import uitLogoImage from '~/assets/images/uit-logo.svg';
import { styles } from './LoginPage.styles';
import { LoginPageProps } from './LoginPage.types';
import { isLoadedTriggered, isErrorTriggered } from '~/utils/redux';

class LoginPage extends Component<LoginPageProps> {
  componentDidUpdate(prevProps: Readonly<LoginPageProps>): void {
    const { logInQuery, onSuccess, onError } = this.props;

    if (isLoadedTriggered(prevProps.logInQuery, logInQuery)) {
      onSuccess();
    }

    if (isErrorTriggered(prevProps.logInQuery, logInQuery)) {
      onError('Authorization error');
    }
  }

  handleLoginClick = () => {
    const { onLogIn } = this.props;

    onLogIn();
  };

  render() {
    const { classes, logInQuery, loggedUserJWT, onLogOut } = this.props;

    return (
      <div className={classes.root}>
        <img className={classes.uitLogo} src={uitLogoImage} alt="UIT logo" />
        {loggedUserJWT && (
          <Fragment>
            <Typography>{loggedUserJWT.data.name}, you are already logged in</Typography>
            <br />
            <Button variant="outlined" onClick={onLogOut}>
              Log out
            </Button>
          </Fragment>
        )}
        {!loggedUserJWT && (
          <Button onClick={this.handleLoginClick} size="small" variant="outlined" disabled={logInQuery.loading}>
            Log in
          </Button>
        )}
      </div>
    );
  }
}

const Styled = withStyles(styles)(LoginPage);

export { Styled as LoginPage };
