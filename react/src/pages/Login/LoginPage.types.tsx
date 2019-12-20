import { WithStyles } from '@material-ui/core';

import { styles } from './LoginPage.styles';
import { DecodedJWTToken } from '~/entities/DecodedJWTToken';
import { QueryState } from '~/utils/redux';

export type LoginPageProps = WithStyles<typeof styles> & {
  logInQuery: QueryState<void>;
  loggedUserJWT: DecodedJWTToken | null;

  onError: (message: string) => unknown;
  onLogOut: () => unknown;
  onLogIn: () => unknown;
  onSuccess: () => void;
};
