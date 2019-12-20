import { Theme, createStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    tabsRoot: {
      marginBottom: theme.spacing(4),
    },
    tabContainer: {},
    tabRoot: {
      textTransform: 'none',
      fontSize: 20,
      fontWeight: 400,
      minWidth: 'auto',
      paddingBottom: 0,
      paddingTop: 0,
      margin: '0 25px',
      '&:nth-child(1)': {
        paddingLeft: 0,
        marginLeft: 0,
      },
    },
    tabsIndicator: {
      backgroundColor: '#fff',
    },
  });
