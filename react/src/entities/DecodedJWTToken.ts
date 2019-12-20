import { cast, Yup } from '~/utils/validation';

export enum UserRoles {
  User = 'USER',
  Admin = 'ADMIN',
}

interface DecodedJWTTokenData {
  'id': number;
  'name': string;
  'roles': UserRoles[];
}

export interface DecodedJWTToken {
  data: DecodedJWTTokenData;
  iat: number;
  exp: number;
}

const schema = Yup.object<DecodedJWTToken>({
  data: Yup.object<DecodedJWTTokenData>({
    id: Yup.number().required(),
    name: Yup.string().required(),
    roles: Yup.array<UserRoles>().required(),
  }).required(),
  iat: Yup.number().required(),
  exp: Yup.number().required(),
}).label('DecodedJWTToken');

export const castDecodedJWTToken = cast<DecodedJWTToken>(schema);
