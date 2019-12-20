const HttpError = require('./HttpError');

/**
 * @swagger
 * definitions:
 *   UnauthorizedHttpError:
 *     allOf:
 *       - $ref: '#/definitions/HttpError'
 *       - properties:
 *           code:
 *             type: integer
 *             default: 401
 *           title:
 *             type: string
 *             default: 'Unauthorized error'
 *
 */
class UnauthorizedHttpError extends HttpError {
  constructor (message, previous) {
    super(401, message, previous);
    this.type = 'Unauthorized error';
  }
}


module.exports = UnauthorizedHttpError;
