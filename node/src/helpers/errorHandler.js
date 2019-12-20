const HttpError = require('../common/errors/HttpError');
const ValidationHttpError = require('../common/errors/ValidationHttpError');
const debug = require('debug')('app:response:error');

/**
 * @swagger
 * responses:
 *   Error:
 *     description: Server error
 *     schema:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           $ref: '#/definitions/HttpError'
 *   UnauthorizedError:
 *     description: Unauthorized error
 *     schema:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           $ref: '#/definitions/UnauthorizedHttpError'
 *   RequestError:
 *     description: Request error
 *     schema:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           $ref: '#/definitions/RequestHttpError'
 *   NotFoundError:
 *     description: Request error
 *     schema:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           $ref: '#/definitions/NotFoundHttpError'
 *   ValidationError:
 *     description: Validation error
 *     schema:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           $ref: '#/definitions/ValidationHttpError'
 */

module.exports = function (err, req, res, next) {
  const errorResponse = {};

  if (res.headersSent) {
    return next(err);
  }
  // Log error
  debug(err);
  // Unknown error
  if (!(err instanceof HttpError)) {
    err = new HttpError(500, 'Unknown error', err);
  }
  // Prepare error response
  errorResponse.code = err.status;
  errorResponse.title = err.type;
  errorResponse.message = err.message;
  if (err instanceof ValidationHttpError) {
    errorResponse.errors = err.errors;
  }
  // Add error stack to error response if is development environment
  if (req.app.get('env') === 'development') {
    errorResponse.stack = err.stack;
    if (err.original) {
      errorResponse.original = {
        name: err.original.name,
        message: err.original.message,
        stack: err.original.stack,
      };
    }
  }

  res.status(err.status);

  return res.json({ error: errorResponse });
};
