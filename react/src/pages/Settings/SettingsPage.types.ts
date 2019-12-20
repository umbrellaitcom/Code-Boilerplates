import { RouteComponentProps } from 'react-router';
import { WithStyles } from '@material-ui/core';

import { styles } from './SettingsPage.styles';

export type SettingsPageProps = WithStyles<typeof styles> & RouteComponentProps & {};
