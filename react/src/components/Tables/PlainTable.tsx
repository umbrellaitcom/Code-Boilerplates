import React, { FC } from 'react';
import clsx from 'clsx';
import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { tableStyles } from './Table.styles';
import { StyledPlainTableProps } from './PlainTable.types';

const PlainTable: FC<StyledPlainTableProps> = ({
  classes,
  header,
  children,
  isLoading,
  error,
  flexibleMinWidth,
  subHeaderText,
}) => (
  <Paper className={classes.root}>
    <div className={classes.topContainer}>
      <div className={classes.headerTableContainer}>
        <div className={classes.headerTableHeader}>{header}</div>
        <div className={classes.headerTableActions} />
      </div>
      {subHeaderText && (
        <div className={classes.headerTableSubHeaderTextContainer}>
          <Typography className={classes.headerTableSubHeaderText}>{subHeaderText}</Typography>
        </div>
      )}
    </div>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className={classes.innerTableCellWrapper}>
            <div className={classes.innerTableWrapper}>
              <Table className={clsx(classes.innerTable, !flexibleMinWidth && classes.innerTableFixedMinWidth)}>
                <TableBody className={classes.innerTableBody}>
                  {!isLoading && !error && children}
                  {!!error && !isLoading && (
                    <TableRow>
                      <TableCell>
                        <Typography className={classes.error}>
                          Не удалось загрузить данные из-за ошибки: {error}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  {isLoading && (
                    <TableRow>
                      <TableCell className={classes.loaderContainer}>
                        <CircularProgress size={30} />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Paper>
);

const Styled = withStyles(tableStyles)(PlainTable);

export { Styled as PlainTable };
