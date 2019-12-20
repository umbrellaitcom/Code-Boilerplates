import { createStyles, Theme } from '@material-ui/core';

import { darkBlue } from '~/colors/darkBlue';

export const tableStyles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      background: 'transparent',
      boxShadow: 'none',
    },
    error: {
      textAlign: 'center',
    },
    loaderContainer: {
      textAlign: 'center',
    },
    innerTableCellWrapper: {
      padding: '0!important',
      border: 'none',
    },
    innerTableWrapper: {
      width: '100%',
      overflowX: 'auto',
    },
    topContainer: {
      marginBottom: theme.spacing(2),
    },
    headerTableContainer: {
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    headerTableHeader: {
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    headerTableActions: {
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      marginLeft: 'auto',
    },
    headerTableFiltersButton: {
      marginLeft: theme.spacing(3),
    },
    headerTableFiltersPopper: {
      zIndex: 10,
    },
    headerTableFiltersPaper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(),
    },
    headerTableSubHeaderTextContainer: {
      marginLeft: 31,
    },
    headerTableSubHeaderText: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    headerTableFiltersChips: {
      overflow: 'hidden',
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(),
      whiteSpace: 'normal',
    },
    headerTableFiltersChip: {
      marginRight: theme.spacing(),
      maxWidth: '100%',
      marginTop: theme.spacing(0.5),
    },
    headerTableFiltersChipLabel: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'inline-block',
      paddingRight: 0,
      marginRight: 12,
    },
    innerTableFixedMinWidth: {
      // Ipad landscape
      minWidth: 730,
    },
    innerTable: {
      '& tr:nth-last-child(1) td': {
        borderBottom: 'none',
      },
      '& tr:hover': {
        background: darkBlue[800],
      },
    },
    innerTableBody: {},
    innerTableHead: {
      '& > tr': {
        height: 48,
      },
    },
  });

export const actionsStyles = (theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing(),
    },
  });
