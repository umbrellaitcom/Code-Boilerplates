import { MouseEvent, ReactNode } from 'react';
import { WithStyles } from '@material-ui/core';

import { tableStyles } from './Table.styles';

export type FilterValue = string | boolean | number;

export type FilterDescriptor<FV extends FilterValue> = {
  value: FV;
  label?: string;
};

export type FilterValuesToDescriptors<F extends { [P in keyof F]: FilterValue }> = {
  [P in keyof F]: FilterDescriptor<F[P]>;
};

export type DataTableProps<F extends { [P in keyof F]: FilterValue }> = {
  onChangePage?: (event: MouseEvent<HTMLButtonElement> | null, page: number) => void;
  header?: ReactNode;
  headerRow?: ReactNode;
  children: ReactNode;
  page: number;
  isLoading?: boolean;
  error?: string;
  count: number;
  hidePagination?: boolean;
  hasRows?: boolean;
  renderFilters?: (
    changeFilters: (field: keyof F, value: F[keyof F]) => void,
    filters: FilterValuesToDescriptors<F>,
  ) => ReactNode;
  filters?: FilterValuesToDescriptors<F>;
  onChangeFilters?: (filters: FilterValuesToDescriptors<F>) => void;
  notFoundText?: string;
  flexibleMinWidth?: boolean;
  subHeaderText?: string;
  rowsPerPage: number;
};

export type StyledDataTableProps<F extends { [P in keyof F]: FilterValue }> = WithStyles<typeof tableStyles> &
  DataTableProps<F>;
