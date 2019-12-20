import { ValidationError } from 'yup';
import { get, isArray } from 'lodash';
import memoizeOne from 'memoize-one';
import { AxiosError } from 'axios';

import { enqueueSnackbarAction } from '~/store/notifications/actions';
import { rootStore } from '~/store';

export type APIValidationError = {
  value: unknown;
  message: string;
  path: string;
};

interface APIError extends Error {
  status?: number;
  message: string;
  validationErrors: APIValidationError[];
}

export class AppError<E extends Error = Error> extends Error {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  public parent: AppError;

  public readonly type: string = 'AppError';
  public readonly originalError?: E;

  public static is = (value: unknown): value is AppError => {
    return value && value instanceof AppError;
  };

  public constructor(originalError?: E, message?: string) {
    super(message);

    this.originalError = originalError;
  }
}

// This error should be never thrown but it's useful to outline some cases
// for example the backend has to return the data in the right format
// but if it's messed up (e.g. NaN in the response) our cast functions will catch this
// and here we have a good place for AppUnreachableError as this should never happen
export class AppUnreachableError extends AppError<Error> {
  public readonly type: string = 'AppUnreachableError';

  public static is = (value: unknown): value is AppUnreachableError => value && value instanceof AppUnreachableError;

  public constructor(message: string) {
    super(undefined, message);
  }
}

export class AppCastError extends AppError<ValidationError> {
  public readonly type: string = 'AppCastError';
  public readonly originalError: ValidationError;

  public static is = (value: unknown): value is AppCastError => value && value instanceof AppCastError;

  public constructor(originalError: ValidationError, message?: string) {
    super(originalError, message);

    this.originalError = originalError;

    // eslint-disable-next-line no-console
    console.error('A cast error occurred', originalError);
  }
}

export class AppResponseError extends AppError<AxiosError> {
  public readonly type: string = 'AppResponseError';
  public readonly originalError: AxiosError;
  public readonly convertedResponse: APIError;

  public static is = (value: unknown): value is AppResponseError => value && value instanceof AppResponseError;

  static convertError = memoizeOne(
    (originalError: AxiosError): APIError => {
      const message = get(originalError.response, 'data.message');
      const status = get(originalError.response, 'status');
      const errors = get(originalError.response, 'data.errors');
      let convertedMessage = 'An unknown API error occurred';
      const convertedValidationErrors: APIValidationError[] = [];

      if (isArray(errors)) {
        errors.forEach((error) => {
          const path = get(error, 'param');
          const value = get(error, 'value');
          const message = get(error, 'msg');

          if (typeof path === 'string' && path && typeof message === 'string' && message) {
            convertedValidationErrors.push({
              path,
              value,
              message,
            });
          } else {
            // eslint-disable-next-line no-console
            console.error('An unknown API validation error', error);
          }
        });
      }

      if (!message) {
        if (convertedValidationErrors.length) {
          convertedMessage = 'A validation API error occurred';
        }
      }

      return {
        name: 'APIError',
        message: convertedMessage,
        status,
        validationErrors: convertedValidationErrors,
      };
    },
  );

  public constructor(originalError: AxiosError) {
    super(originalError, originalError.message);

    this.originalError = originalError;
    this.convertedResponse = AppResponseError.convertError(originalError);
  }
}

export const imitateResponseError = (message: string): AppResponseError => {
  return new AppResponseError({
    name: 'ImitatedAppResponseError',
    message,
    config: {},
    isAxiosError: true,
  });
};

export const errorToSnackbar = (error: unknown) => {
  let message = 'An unknown error occurred';

  if (AppResponseError.is(error)) {
    if (error.convertedResponse.validationErrors.length) {
      message = error.convertedResponse.validationErrors.map((validationError) => validationError.message).join('\n');
    }
  } else if (AppError.is(error)) {
    message = error.message || 'An unknown error occurred';
  }

  rootStore.dispatch(
    enqueueSnackbarAction({
      message,
      options: {
        variant: 'error',
      },
    }),
  );
};
