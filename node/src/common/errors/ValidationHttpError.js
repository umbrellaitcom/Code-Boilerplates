const HttpError = require('./HttpError');

/**
 * @swagger
 * definitions:
 *   ValidationErrorItem:
 *     properties:
 *       path:
 *         type: string
 *       type:
 *         type: string
 *       value:
 *         type: string
 *       message:
 *         type: string
 *
 *   ValidationHttpError:
 *     allOf:
 *       - $ref: '#/definitions/RequestHttpError'
 *       - properties:
 *           title:
 *             type: string
 *             default: 'Validation error'
 *           errors:
 *             type: array
 *             items:
 *               $ref: '#/definitions/ValidationErrorItem'
 *
 *
 */
class ValidationHttpError extends HttpError {
  constructor (message, errors, previous) {
    super(400, message, previous);
    this.type = 'Validation error';
    this.errors = errors;
  }
}


module.exports = ValidationHttpError;
