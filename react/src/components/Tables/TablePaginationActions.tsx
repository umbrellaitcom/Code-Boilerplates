import React, { FC, MouseEvent } from 'react';
import { IconButton, withStyles } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

import { actionsStyles } from './Table.styles';
import { StyledTablePaginationActionsProps } from './TablePaginationActions.types';

const TablePaginationActions: FC<StyledTablePaginationActionsProps> = ({
  count,
  page,
  rowsPerPage,
  onChangePage,
  classes,
  isLoading,
}) => {
  const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0 || isLoading} aria-label="Previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1 || isLoading}
        aria-label="Next page"
      >
        <KeyboardArrowRight />
      </IconButton>
    </div>
  );
};

const Styled = withStyles(actionsStyles)(TablePaginationActions);

export { Styled as TablePaginationActions };
