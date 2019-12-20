import { ReactNode } from 'react';
import { WithStyles } from '@material-ui/core';

import { tableStyles } from './Table.styles';

export type PlainTableProps = {
  header?: ReactNode;
  children: ReactNode;
  isLoading?: boolean;
  error?: string;
  flexibleMinWidth?: boolean;
  subHeaderText?: string;
};

export type StyledPlainTableProps = WithStyles<typeof tableStyles> & PlainTableProps;
