/* eslint-disable @typescript-eslint/camelcase */

import { AxiosResponse } from 'axios';

import { logInAction } from '~/store/user/actions';
import { JWTToken } from '~/entities/JWTToken';
import { createUserAction, getUsersAction } from '~/store/users/actions';
import { PagedResponse } from '~/entities/PagedResponse';
import { User } from '~/entities/User';

const mockedResponse = <T>(data: T, status = 200): AxiosResponse<T> => {
  return {
    data,
    status,
    statusText: '',
    headers: {},
    config: {},
    request: undefined,
  };
};

export const mocks = {
  [logInAction.getType()]: (): AxiosResponse<JWTToken> =>
    mockedResponse<JWTToken>({
      access_token:
        // Expire at Wed Jan 15 2031
        // eslint-disable-next-line max-len
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2MjYyMzkwMjIsImRhdGEiOnsiaWQiOjEsIm5hbWUiOiJBZG1pbiIsInJvbGVzIjpbIlVTRVIiLCJBRE1JTiJdfX0._7MPqTYcumEDhyGe9Mw5KV1DCYUAB3DKavu9t8ZtSN4',
      refresh_token:
        // eslint-disable-next-line max-len
        'dummy-token',
    }),
  [getUsersAction.getType()]: (): AxiosResponse<PagedResponse<User>> =>
    mockedResponse<PagedResponse<User>>({
      items: [
        {
          id: 1,
          name: 'User 1',
          email: 'user1@email.com',
        },
        {
          id: 2,
          name: 'User 2',
          email: 'user2@email.com',
        },
      ],
      pagination: {
        page: 1,
        rowCount: 2,
        pageCount: 1,
        pageSize: 2,
      },
    }),
  [createUserAction.getType()]: (): AxiosResponse<User> =>
    mockedResponse<User>({
      id: Math.random() * 1000000,
      name: 'User 123',
      email: 'user123@mail.com',
    }),
};
