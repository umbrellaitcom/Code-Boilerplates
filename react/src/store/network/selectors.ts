import { logInAction } from '~/store/user/actions';
import { getMutation, getQuery } from '~/utils/redux';
import { createUserAction, getUsersAction } from '~/store/users/actions';
import { PagedResponse } from '~/entities/PagedResponse';
import { User } from '~/entities/User';

export const logInQuerySelector = getQuery<void>({
  type: logInAction.getType(),
});

export const getUsersQuerySelector = getQuery<PagedResponse<User>>({
  type: getUsersAction.getType(),
});

export const createUserQuerySelector = getMutation({
  type: createUserAction.getType(),
});
