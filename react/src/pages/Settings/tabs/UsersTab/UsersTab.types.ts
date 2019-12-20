import { WithStyles } from '@material-ui/core';

import { FilterValuesToDescriptors } from '~/components/tables/DataTable.types';
import { User } from '~/entities/User';
import { PagedResponse } from '~/entities/PagedResponse';
import { QueryState } from '~/utils/redux';
import { GetUsersRequestData } from '~/store/users/actions';
import { styles } from './UsersTab.styles';

export interface Filters {
  search: string;
}

export type UsersTabProps = WithStyles<typeof styles> & {
  getUsersQuery: QueryState<PagedResponse<User>>;
  onMount: (params: GetUsersRequestData) => void;
  onParams: (params: GetUsersRequestData) => void;
};

export type UsersTabState = {
  page: number;
  filters: FilterValuesToDescriptors<Filters>;
  isCreationUserModalShown: boolean;
};
