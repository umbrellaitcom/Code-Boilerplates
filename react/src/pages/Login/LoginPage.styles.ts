import { Theme, createStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    googleLogo: {
      marginRight: theme.spacing(),
    },
    uitLogo: {
      marginBottom: theme.spacing(6),
    },
  });
