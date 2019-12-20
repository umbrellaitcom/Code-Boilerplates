const HttpError = require('./HttpError');

/**
 * @swagger
 * definitions:
 *   RequestHttpError:
 *     allOf:
 *       - $ref: '#/definitions/HttpError'
 *       - properties:
 *           code:
 *             type: integer
 *             default: 400
 *           title:
 *             type: string
 *             default: 'Request error'
 *
 */
class RequestHttpError extends HttpError {
  constructor (message, previous) {
    super(400, message, previous);
    this.type = 'Request error';
  }
}


module.exports = RequestHttpError;
