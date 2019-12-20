import { createStyles } from '@material-ui/core';

import { darkBlue } from '~/colors/darkBlue';

export const styles = createStyles({
  root: {
    minHeight: '100vh',
    flexWrap: 'nowrap',
    display: 'flex',
    flexDirection: 'column',
  },
  headerContainer: {},
  bodyContainer: {
    display: 'flex',
    flexGrow: 1,
    paddingTop: 85,
    flexDirection: 'column',
  },
  footerContainer: {
    alignItems: 'flex-end',
    background: darkBlue[800],
    height: 20,
  },
  toolbarShrink: {
    flexGrow: 1,
  },
});
