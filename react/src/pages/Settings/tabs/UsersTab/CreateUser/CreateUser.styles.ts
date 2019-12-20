import { Theme, createStyles } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    submitButton: {
      marginRight: theme.spacing(2),
    },
    textField: {
      marginBottom: theme.spacing(5),
    },
  });
