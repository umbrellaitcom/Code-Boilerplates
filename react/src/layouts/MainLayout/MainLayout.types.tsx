import { WithStyles } from '@material-ui/core';

import { styles } from './MainLayout.styles';
import { DecodedJWTToken } from '~/entities/DecodedJWTToken';

export type MainLayoutProps = WithStyles<typeof styles> & {
  loggedUserJWT: DecodedJWTToken | null;
};
