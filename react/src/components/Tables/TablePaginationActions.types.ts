import { MouseEvent } from 'react';
import { WithStyles } from '@material-ui/core';

import { actionsStyles } from './Table.styles';

export type TablePaginationActionsTypes = {
  onChangePage: (event: MouseEvent<HTMLButtonElement> | null, page: number) => void;
  count: number;
  page: number;
  rowsPerPage: number;
  isLoading?: boolean;
};

export type StyledTablePaginationActionsProps = WithStyles<typeof actionsStyles> & TablePaginationActionsTypes;
