import React, { useState, ReactNode, Component } from 'react';
import { cloneDeep, forOwn } from 'lodash';
import clsx from 'clsx';
import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  CircularProgress,
  Popper,
  ClickAwayListener,
  RootRef,
  Chip,
} from '@material-ui/core';
import { FilterList } from '@material-ui/icons';

import { tableStyles } from './Table.styles';
import { TablePaginationActions } from './TablePaginationActions';

import { FilterValue, DataTableProps, StyledDataTableProps } from './DataTable.types';

function DataTable<F extends { [P in keyof F]: FilterValue }>({
  page,
  classes,
  onChangePage,
  header,
  children,
  isLoading,
  error,
  count,
  hidePagination,
  hasRows,
  renderFilters,
  filters,
  onChangeFilters,
  notFoundText,
  flexibleMinWidth,
  subHeaderText,
  headerRow,
  rowsPerPage,
}: StyledDataTableProps<F>) {
  const [filtersAnchorEl, setFiltersAnchorEl] = useState<HTMLElement | undefined>(undefined);
  const [toggleFiltersButtonEl, setToggleFiltersButton] = useState<HTMLElement | undefined>(undefined);
  const [filtersContainerEl, setFiltersContainerEl] = useState<HTMLElement | undefined>(undefined);
  const isFiltersOpened = Boolean(filtersAnchorEl);
  let changeFiltersExposed;
  const filterChips: ReactNode[] = [];
  const shouldRenderBody = Boolean(hasRows && !isLoading && !error);

  if (filters) {
    const changeFilters = (field: keyof F, value: F[keyof F]) => {
      const newFilters = cloneDeep(filters);
      newFilters[field].value = value;

      if (onChangeFilters) {
        onChangeFilters(newFilters);
      }
    };
    // Hack TS to avoid `changeFilters has any` error on `Chip`
    changeFiltersExposed = changeFilters;

    forOwn(filters, (filterDescriptor, field) => {
      if (!filterDescriptor.value) {
        return;
      }

      let cleanValue: FilterValue = '';
      const labelToRender = filterDescriptor.label;
      let valueToRender: string | number = '';

      if (typeof filterDescriptor.value === 'string') {
        cleanValue = '';
        valueToRender = filterDescriptor.value;
      } else if (typeof filterDescriptor.value === 'boolean') {
        cleanValue = false;
        valueToRender = filterDescriptor.value ? 'Yes' : 'No';
      } else if (typeof filterDescriptor.value === 'number') {
        cleanValue = 0;
        valueToRender = filterDescriptor.value;
      }

      filterChips.push(
        <Chip
          classes={{
            label: classes.headerTableFiltersChipLabel,
          }}
          key={`${field}:${valueToRender}`}
          label={labelToRender ? `${labelToRender}: ${valueToRender}` : valueToRender}
          onDelete={() => changeFilters(field as keyof F, cleanValue as F[keyof F])}
          className={classes.headerTableFiltersChip}
        />,
      );
    });
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.topContainer}>
        <div className={classes.headerTableContainer} ref={(el) => setFiltersContainerEl(el || undefined)}>
          <div className={classes.headerTableHeader}>{header}</div>
          <div className={classes.headerTableActions}>
            {changeFiltersExposed && (
              <RootRef rootRef={(el) => setToggleFiltersButton(el)}>
                <IconButton
                  className={classes.headerTableFiltersButton}
                  onClick={(event) => setFiltersAnchorEl(filtersAnchorEl ? undefined : event.currentTarget)}
                >
                  <FilterList />
                </IconButton>
              </RootRef>
            )}
            {changeFiltersExposed && (
              <Popper
                container={filtersContainerEl}
                open={isFiltersOpened}
                anchorEl={filtersAnchorEl}
                className={classes.headerTableFiltersPopper}
              >
                <ClickAwayListener
                  onClickAway={(event) => {
                    if (
                      event.target === toggleFiltersButtonEl ||
                      (toggleFiltersButtonEl && toggleFiltersButtonEl.contains(event.target as Node))
                    ) {
                      return;
                    }

                    setFiltersAnchorEl(undefined);
                  }}
                >
                  <Paper className={classes.headerTableFiltersPaper} square>
                    {changeFiltersExposed && renderFilters && filters && renderFilters(changeFiltersExposed, filters)}
                  </Paper>
                </ClickAwayListener>
              </Popper>
            )}
            {!hidePagination && (
              <TablePagination
                component="div"
                colSpan={1}
                count={count}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[rowsPerPage]}
                // Start from 0 in TablePagination
                page={page - 1}
                onChangePage={(event, page) => {
                  // tslint:disable-next-line:no-empty
                  onChangePage ? onChangePage(event, page + 1) : () => {};
                }}
                ActionsComponent={(props) => <TablePaginationActions {...props} isLoading={isLoading} />}
              />
            )}
          </div>
        </div>
        {subHeaderText && (
          <div className={classes.headerTableSubHeaderTextContainer}>
            <Typography className={classes.headerTableSubHeaderText}>{subHeaderText}</Typography>
          </div>
        )}
        {!!filterChips.length && <div className={classes.headerTableFiltersChips}>{filterChips}</div>}
      </div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.innerTableCellWrapper}>
              <div className={classes.innerTableWrapper}>
                <Table
                  className={clsx(classes.innerTable, hasRows && !flexibleMinWidth && classes.innerTableFixedMinWidth)}
                >
                  {shouldRenderBody && headerRow && (
                    <TableHead className={classes.innerTableHead}>{headerRow}</TableHead>
                  )}
                  <TableBody className={classes.innerTableBody}>
                    {shouldRenderBody && children}
                    {!!error && !isLoading && (
                      <TableRow>
                        <TableCell>
                          <Typography className={classes.error}>An error occurred: {error}</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                    {!hasRows && !error && !isLoading && (
                      <TableRow>
                        <TableCell>
                          <Typography className={classes.error}>{notFoundText || 'Not found'}</Typography>
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
}

// Wrap to pass generics through withStyles
class WrappedDataTable<F extends { [P in keyof F]: FilterValue }> extends Component<DataTableProps<F>> {
  private readonly Styled = withStyles(tableStyles)((props: StyledDataTableProps<F>) => <DataTable<F> {...props} />);

  render() {
    return <this.Styled {...this.props} />;
  }
}

export { WrappedDataTable as DataTable };
