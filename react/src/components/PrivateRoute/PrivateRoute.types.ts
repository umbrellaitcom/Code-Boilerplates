import { ComponentType } from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';

export interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}
