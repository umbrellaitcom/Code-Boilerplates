const HttpError = require('./../common/errors/HttpError');
const RequestHttpError = require('./../common/errors/RequestHttpError');
const ValidationHttpError = require('./../common/errors/ValidationHttpError');
const SerializerError = require('./../common/errors/SerializerError');

const { ValidationError } = require('sequelize');

function wrapErrorHandler (fn) {
  return async function (req, res, next, ...args) {
    try {
      return await fn(req, res, next, ...args);
    } catch (error) {
      if (error instanceof HttpError) {
        return next(error);
      }
      if (error instanceof SerializerError) {
        next(new RequestHttpError(error.message, error));
      }
      // Validation error
      if (error instanceof ValidationError) {
        return next(new ValidationHttpError(error.message, error.errors.map((e) => ({
          path: `${e.instance.constructor.name}.${e.path}`,
          type: e.validatorKey,
          value: e.value,
          message: e.message
        })), error));
      }
      // Request error
      if (error.name === 'SyntaxError') {
        return next(new RequestHttpError(error.message, error));
      }

      return next(new HttpError(500, error.message, error));
    }
  };
}

module.exports = wrapErrorHandler;
