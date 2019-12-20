import { createAction } from 'redux-act';
import urljoin from 'url-join';

import { CastableRequestActionMeta, CompletedRequestAction, QueryState, RequestActionPayload } from '~/utils/redux';
import { PagedRequest } from '~/entities/PagedRequest';
import { castPagedUsers, castUser, User } from '~/entities/User';
import { PagedResponse } from '~/entities/PagedResponse';

export type GetUsersRequestData = PagedRequest & {};

export const getUsersAction = createAction<GetUsersRequestData, RequestActionPayload>(
  'GET_USERS',
  (params) => ({
    request: { url: urljoin(process.env.REACT_APP_API_URL, '/users'), method: 'get', params },
  }),
  (): CastableRequestActionMeta<PagedResponse<User>> => ({
    castResponseFunction: castPagedUsers,
    driver: 'mock',
    asMutation: false,
    mutations: {
      CREATE_USER: {
        updateData: (state: QueryState<PagedResponse<User>>, action: CompletedRequestAction<User>) => ({
          ...state.data,
          items: [...state.data.items, action.payload.data],
          pagination: {
            ...state.data.pagination,
            rowCount: state.data.pagination.rowCount + 1,
            pageSize: state.data.pagination.pageSize + 1,
          },
        }),
      },
    },
  }),
);

export type CreateUserRequestData = {
  name: string;
  email: string;
};

export const createUserAction = createAction<CreateUserRequestData, RequestActionPayload>(
  'CREATE_USER',
  (data) => ({
    request: { url: urljoin(process.env.REACT_APP_API_URL, '/users'), method: 'post', data },
  }),
  (): CastableRequestActionMeta<User> => ({
    castResponseFunction: castUser,
    driver: 'mock',
    asMutation: true,
  }),
);
