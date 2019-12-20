import React, { FC, createElement } from 'react';
import { Route, Redirect } from 'react-router';

import { PrivateRouteProps } from './PrivateRoute.types';

export const PrivateRoute: FC<PrivateRouteProps> = ({ component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (isAuthenticated ? createElement(component, props) : <Redirect to="/login" />)} />
);
