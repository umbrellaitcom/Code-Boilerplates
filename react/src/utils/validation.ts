import * as Yup from 'yup';
import { get, trim } from 'lodash';

import { AppUnreachableError, AppCastError } from './errors';
import { PagedResponse } from '~/entities/PagedResponse';

export type CastFunction<T> = (value: unknown, throwError?: boolean) => T | undefined;
export type CastArrayFunc<T> = (value: unknown, throwError?: boolean) => T[] | undefined;
export type CastPagedFunc<T> = (value: unknown, throwError?: boolean) => PagedResponse<T> | undefined;

export { Yup };

export const castPaged = <T extends object | undefined = object>(schema: Yup.ArraySchema<T>): CastPagedFunc<T> => {
  const defaultParams = { strict: true, stripUnknown: true };

  const pagedScheme = Yup.object<PagedResponse<T>>({
    items: schema,
    pagination: Yup.object({
      page: Yup.number().required(),
      pageSize: Yup.number().required(),
      rowCount: Yup.number().required(),
      pageCount: Yup.number().required(),
    }),
  });

  return (value: unknown, throwError = true): PagedResponse<T> | undefined => {
    try {
      return pagedScheme.required().validateSync(value, defaultParams);
    } catch (error) {
      if (throwError) {
        throw new AppCastError(error);
      }
    }

    return undefined;
  };
};

export const cast = <T extends object | undefined = object>(schema: Yup.ObjectSchema<T>): CastFunction<T> => {
  const defaultParams = { strict: true, stripUnknown: true };

  return (value: unknown, throwError = true): T | undefined => {
    try {
      return schema.required().validateSync(value, defaultParams);
    } catch (error) {
      if (throwError) {
        throw new AppCastError(error);
      }
    }

    return undefined;
  };
};

export const castArray = <T extends object | undefined = object>(schema: Yup.ArraySchema<T>): CastArrayFunc<T> => {
  const defaultArray = { strict: true, stripUnknown: true };

  return (value: unknown, throwError = true): T[] | undefined => {
    try {
      return schema.validateSync(value, defaultArray);
    } catch (error) {
      if (throwError) {
        throw new AppCastError(error);
      }
    }

    return undefined;
  };
};

export const castResponse = <T>(value: unknown, castFunc: CastFunction<T>): T => {
  // 'data' is the key where axios places response from the server
  const result = castFunc(get(value, 'data'), true);

  if (result) {
    return result;
  }

  throw new AppUnreachableError('An unreachable error');
};

export const isEmpty = (value: string, useTrim = true): boolean => {
  return (useTrim ? trim(value) : value) === '';
};

export const isEmptyUsername = (value: string): boolean => {
  return isEmpty(value, true) || trim(value) === 'd-';
};

export const isEmptyPassword = (value: string): boolean => {
  return isEmpty(value, false);
};

export const isShort = (value: string, limit: number): boolean => {
  return value.length < limit;
};

export const isShortPassword = (value: string): boolean => {
  return isShort(value, 8);
};

export const isWeakPassword = (value: string): boolean => {
  return (
    isEmptyPassword(value) ||
    !/[a-z]+/.test(value) ||
    !/[A-Z]+/.test(value) ||
    !/[0-9]+/.test(value) ||
    !/[!@"#$%:^,&.*;)(_+=-]+/.test(value)
  );
};

export const isNonLatinPassword = (value: string): boolean => {
  return isEmptyPassword(value) || /[^a-zA-Z0-9!@"#$%:^,&.*;)(_+=-]+/.test(value);
};
