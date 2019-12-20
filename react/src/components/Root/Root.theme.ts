import { createMuiTheme } from '@material-ui/core';

import { darkBlue } from '~/colors/darkBlue';
import { green } from '~/colors/green';
import { red } from '~/colors/red';

const palette = 'dark';

// Just to access the theme's utils
const defaultTheme = createMuiTheme();

export const rootTheme = createMuiTheme({
  palette: {
    type: palette,
    background: {
      default: darkBlue[900],
      paper: darkBlue[800],
    },
    primary: {
      main: green[600],
    },
    secondary: {
      main: red[400],
    },
  },
  overrides: {
    MuiTypography: {
      body1: {
        fontSize: defaultTheme.typography.pxToRem(24),
      },
      h5: {
        fontWeight: 300,
        fontSize: defaultTheme.typography.pxToRem(32),
      },
    },
    MuiContainer: {
      maxWidthLg: {
        [defaultTheme.breakpoints.up('lg')]: {
          maxWidth: 1304,
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: darkBlue[800],
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      outlined: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        border: `1px solid ${palette === 'light' ? 'rgba(0, 0, 0, 0.23)' : '#fff'}`,
        padding: '12px 22px',
      },
      sizeSmall: {
        padding: '5px 15px',
        fontSize: defaultTheme.typography.pxToRem(13),
      },
      sizeLarge: {
        padding: '15px 26px',
        fontSize: defaultTheme.typography.pxToRem(15),
      },
    },
    MuiTableRow: {
      head: {
        background: 'transparent!important',
        cursor: 'inherit',
      },
      root: {
        background: 'transparent',
      },
    },
    MuiTableCell: {
      root: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '20vw',
        borderBottomColor: palette === 'dark' ? darkBlue[700] : '#000',
      },
      head: {
        fontWeight: 600,
        fontSize: defaultTheme.typography.pxToRem(18),
        color: '#fff',
        borderBottomColor: palette === 'dark' ? darkBlue[200] : '#000',
      },
    },
    MuiIconButton: {
      root: {
        padding: 3,
      },
    },
    MuiTablePagination: {
      toolbar: {
        paddingRight: 0,
        height: 'auto',
        minHeight: 'auto',
      },
    },
    MuiButtonBase: {
      root: {
        color: '#fff!important',
        borderWidth: '2px!important',
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderWidth: 2,
      },
    },
  },
});
