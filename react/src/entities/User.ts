import { cast, castPaged, Yup } from '~/utils/validation';

export interface User {
  id: number;
  name: string;
  email: string;
}

const userScheme = Yup.object<User>({
  id: Yup.number().required(),
  name: Yup.string().required(),
  email: Yup.string().required(),
}).label('User');

const usersScheme = Yup.array()
  .of(userScheme)
  .label('Users');

export const castUser = cast<User>(userScheme);
export const castPagedUsers = castPaged<User>(usersScheme);
