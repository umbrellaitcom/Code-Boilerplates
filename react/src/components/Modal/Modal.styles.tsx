import { createStyles, Theme } from '@material-ui/core';

import { darkBlue } from '~/colors/darkBlue';

export const styles = (theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 4, 4, 4),
      outline: 'none',
      borderRadius: 2,
      border: `1px solid ${darkBlue[700]}`,
      position: 'relative',
    },
    contentContainer: {},
    close: {
      display: 'inline-block',
      color: theme.palette.secondary.main,
      right: theme.spacing(4),
      top: theme.spacing(1.5),
      fontSize: theme.typography.pxToRem(50),
      lineHeight: theme.typography.pxToRem(50 / 1.5),
      fontWeight: 200,
      transform: 'rotate(45deg)',
      transition: theme.transitions.create('', {
        duration: theme.transitions.duration.short,
      }),
      cursor: 'pointer',
      userSelect: 'none',
      position: 'absolute',

      '&:hover': {
        fontWeight: 400,
      },
    },
  });
