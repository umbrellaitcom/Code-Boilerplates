import { get, isArray } from 'lodash';

export class AppError extends Error {

	parent;

	type = 'AppError';
	originalError;

	static is = (value) => {
		return value && value instanceof AppError;
	};

	constructor(originalError, message) {
		super(message);

		this.originalError = originalError;
	}
}

export class AppResponseError extends AppError {
	type = 'AppResponseError';
	originalError;
	convertedResponse;

	static is = (value) => value && value instanceof AppResponseError;

	static convertError =
		(originalError) => {
			const message = get(originalError.response, 'data.message');
			const status = get(originalError.response, 'status');
			const errors = get(originalError.response, 'data.errors');
			let convertedMessage = 'An unknown API error occurred';
			const convertedValidationErrors = [];

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
		};

	constructor(originalError) {
		super(originalError, originalError.message);

		this.originalError = originalError;
		this.convertedResponse = AppResponseError.convertError(originalError);
	}
}
