/* eslint-disable @typescript-eslint/camelcase */

import { cast, Yup } from '~/utils/validation';

export interface JWTToken {
  access_token: string;
  refresh_token: string;
}

const schema = Yup.object<JWTToken>({
  access_token: Yup.string().required(),
  refresh_token: Yup.string().required(),
}).label('JWTToken');

export const castJWTToken = cast<JWTToken>(schema);
